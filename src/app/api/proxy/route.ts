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
    
    // 阻止內部網路地址以防止 SSRF(erver-Side Request Forgery) 攻擊
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

// 清理和安全化 HTTP 標頭
function sanitizeHeaders(headers: Headers): Record<string, string> {
  const safeHeaders: Record<string, string> = {};
  const allowedHeaders = [
    'content-type',
    'content-length',
    'cache-control',
    'expires',
    'last-modified',
    'etag'
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  // 驗證 URL 長度
  if (url.length > 2048) {
    return new Response("URL too long", { status: 400 });
  }

  // 驗證 URL 安全性
  if (!isUrlSafe(url)) {
    return new Response("URL not allowed - potential security risk", { status: 403 });
  }

  try {
    // 建立 AbortController 用於超時控制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SecureProxy/1.0)',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
      },
      signal: controller.signal,
      // 不跟隨重導向以避免潛在的安全問題
      redirect: 'manual'
    });

    clearTimeout(timeoutId);

    // 處理重導向
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location && isUrlSafe(location)) {
        return new Response(null, {
          status: response.status,
          headers: {
            'Location': location,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        });
      } else {
        return new Response("Redirect not allowed", { status: 403 });
      }
    }

    if (!response.ok) {
      return new Response(`Proxy fetch failed: ${response.status}`, { 
        status: response.status >= 400 ? response.status : 502 
      });
    }

    // 檢查內容長度
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
      return new Response("Content too large", { status: 413 });
    }

    // 讀取回應內容
    const buffer = await response.arrayBuffer();
    
    // 雙重檢查檔案大小
    if (buffer.byteLength > MAX_FILE_SIZE) {
      return new Response("Content too large", { status: 413 });
    }

    // 清理原始回應標頭
    const safeHeaders = sanitizeHeaders(response.headers);
    
    // 確保有 Content-Type
    if (!safeHeaders['content-type']) {
      safeHeaders['content-type'] = 'application/octet-stream';
    }

    return new Response(buffer, {
      status: 200,
      headers: {
        ...safeHeaders,
        // 安全性標頭
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Cache-Control": safeHeaders['cache-control'] || "public, max-age=3600",
        // 添加代理標識
        "X-Proxied-By": "SecureProxy",
      },
    });
  } catch (error) {
    console.error('Proxy error:', {
      url: url.substring(0, 100), // 只記錄前100個字符
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response("Request timeout", { status: 408 });
    }
    
    return new Response("Server error", { status: 500 });
  }
}
