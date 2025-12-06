import { NextRequest, NextResponse } from 'next/server';

// 最大檔案大小 (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// 請求超時時間 (15秒)
const REQUEST_TIMEOUT = 15000;

// 驗證 URL 基本安全性
function isUrlSafe(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // 只允許 HTTP 和 HTTPS 協議
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }
    
    // 阻止內部網路地址以防止 SSRF (Server-Side Request Forgery) 攻擊
    const hostname = parsedUrl.hostname.toLowerCase();
    
    // 檢查私有 IP 範圍
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      hostname.startsWith('169.254.') || // Link-local
      hostname.startsWith('224.') || // Multicast
      hostname.includes('..') // Path traversal
    ) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// 清理和安全化 HTTP 標頭 (回應給客戶端時)
function sanitizeResponseHeaders(headers: Headers): Record<string, string> {
  const safeHeaders: Record<string, string> = {};
  // 允許轉發的標頭白名單
  const allowedHeaders = [
    'content-type',
    'content-length',
    'cache-control',
    'expires',
    'last-modified',
    'etag',
    'content-encoding',
    'content-disposition'
  ];
  
  for (const [key, value] of headers.entries()) {
    const lowerKey = key.toLowerCase();
    if (allowedHeaders.includes(lowerKey)) {
      // 移除可能的惡意字符
      const sanitizedValue = value.replace(/[\r\n]/g, '');
      safeHeaders[key] = sanitizedValue;
    }
  }
  
  return safeHeaders;
}

// 處理所有類型的請求
async function handleProxy(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const initialUrl = searchParams.get("url");

  if (!initialUrl) {
    return new NextResponse("缺少 URL 參數", { status: 400 });
  }

  // 驗證 URL 長度
  if (initialUrl.length > 2048) {
    return new NextResponse("URL 太長", { status: 400 });
  }

  let currentUrl = initialUrl;

  try {
    // 建立 AbortController 用於超時控制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    let response: Response | undefined;
    let redirectCount = 0;
    let retryCount = 0;
    const MAX_REDIRECTS = 5;
    const MAX_RETRIES = 3;

    // 準備請求標頭
    const requestHeaders = new Headers(req.headers);
    // 移除不應該轉發的標頭
    requestHeaders.delete('host');
    requestHeaders.delete('connection');
    requestHeaders.delete('content-length'); // 讓 fetch 自動計算
    // 設置默認 User-Agent 如果沒有提供
    if (!requestHeaders.has('user-agent')) {
        requestHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }

    while (redirectCount < MAX_REDIRECTS && retryCount <= MAX_RETRIES) {
      // 驗證 URL 安全性
      if (!isUrlSafe(currentUrl)) {
        return new NextResponse("不允許的 URL - 潛在的安全風險", { status: 403 });
      }

      try {
        const fetchOptions: RequestInit = {
            method: req.method,
            headers: requestHeaders,
            signal: controller.signal,
            redirect: 'manual', // 手動處理重導向
        };

        // 如果不是 GET 或 HEAD 請求，則轉發請求主體
        if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
            // 注意: 在某些環境下，傳遞 stream 可能需要 { duplex: 'half' }
            // @ts-expect-error - duplex is not yet in standard RequestInit types for all envs but needed for node fetch with stream
            fetchOptions.duplex = 'half'; 
            fetchOptions.body = req.body;
        }

        response = await fetch(currentUrl, fetchOptions);
      } catch (error) {
        // 處理網絡錯誤重試 (排除 AbortError)
        if (retryCount < MAX_RETRIES && error instanceof Error && error.name !== 'AbortError') {
          retryCount++;
          const delay = 500 * Math.pow(2, retryCount) + Math.random() * 200;
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw error;
      }

      // 處理重導向
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (location) {
          currentUrl = new URL(location, currentUrl).toString();
          redirectCount++;
          continue;
        }
      }

      // 處理 429 Too Many Requests 和 5xx Server Errors
      if ((response.status === 429 || response.status >= 500) && retryCount < MAX_RETRIES) {
        retryCount++;
        // 指數退避策略 (Exponential Backoff)
        const delay = 500 * Math.pow(2, retryCount) + Math.random() * 200;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      
      break;
    }

    clearTimeout(timeoutId);

    if (!response) {
      return new NextResponse("上游伺服器無回應", { status: 502 });
    }

    // 檢查內容長度 (如果有的話)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
      return new NextResponse("內容過大", { status: 413 });
    }

    // 讀取回應內容
    // 為了安全檢查大小，我們先讀取到 ArrayBuffer
    const buffer = await response.arrayBuffer();
    
    // 雙重檢查檔案大小
    if (buffer.byteLength > MAX_FILE_SIZE) {
      return new NextResponse("內容過大", { status: 413 });
    }

    if (!response.ok) {
        // 嘗試讀取錯誤訊息以便除錯 (這裡 buffer 已經讀取了，可以轉文字)
        const errorText = new TextDecoder().decode(buffer).substring(0, 200);
        console.error(`代理請求失敗 ${currentUrl}: ${response.status} ${errorText}`);
        
        return new NextResponse(`代理請求失敗: ${response.status}`, { 
          status: response.status >= 400 ? response.status : 502 
        });
    }

    // 清理原始回應標頭
    const safeHeaders = sanitizeResponseHeaders(response.headers);
    
    // 確保有 Content-Type
    if (!safeHeaders['content-type']) {
      safeHeaders['content-type'] = 'application/octet-stream';
    }

    return new NextResponse(buffer, {
      status: response.status,
      headers: {
        ...safeHeaders,
        // 安全性標頭
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        // 添加代理標識
        "X-Proxied-By": "SecureProxy",
      },
    });
  } catch (error) {
    console.error('代理錯誤:', {
      url: initialUrl.substring(0, 100), // 只記錄前100個字符
      error: error instanceof Error ? error.message : '未知錯誤'
    });
    
    if (error instanceof Error && error.name === 'AbortError') {
      return new NextResponse("請求超時", { status: 408 });
    }
    
    return new NextResponse("伺服器內部錯誤", { status: 500 });
  }
}

// 導出所有支援的 HTTP 方法
export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const HEAD = handleProxy;
export const OPTIONS = handleProxy;
