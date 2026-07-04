export const fetcher = <T,>(url: string) =>
  fetch(url).then((res) => res.json() as Promise<T>);
export const slugify = (s: string) => encodeURIComponent(s);
export const deslugify = (s: string) => decodeURIComponent(s);

export const connectSubHref = (baseUrl: string, subUrl: string) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedSub = subUrl.startsWith("#") ? subUrl : `#${subUrl}`;
  return `${normalizedBase}${normalizedSub}`;
};

/**
 * createProxy - 用 Proxy 實作可鏈式存取路徑的 fetch client
 *
 * 用法：
 *   const example = createProxy<DefaultResponse>("https://example.com");
 *
 *   // 呼叫 root -> fetch("https://example.com", init)
 *   await example<MyType>();
 *
 *   // 呼叫 example.a.b.c -> fetch("https://example.com/a/b/c?key=value", init)
 *   await example.a.b.c<MyType>({ key: "value" }, { method: "GET" });
 *
 * 注意：root 呼叫跟巢狀呼叫共用同一種簽名 (query?, init?)，
 * root 呼叫時 query 可以省略或傳 undefined。
 *
 */

// ---------- Query 型別 ----------

/** 允許放進 query string 的基本值型別 */
type QueryPrimitive = string | number | boolean;

/**
 * query 物件的 value 可以是：
 * - 單一基本值
 * - 陣列（會被展開成多個同名 key，例如 tags: ["a","b"] -> ?tags=a&tags=b）
 * - null / undefined（該欄位會被整個忽略，不會出現在 query string 中）
 */
export type QueryParams = Record<
  string,
  QueryPrimitive | QueryPrimitive[] | null | undefined
>;

// ---------- Proxy 節點型別 ----------

/**
 * ProxyCallable<T>
 * - 可以像函式一樣呼叫，回傳 Promise<R>（R 預設為 T，可在呼叫時用泛型覆蓋）
 * - 也可以繼續存取任意屬性，取得下一層的 ProxyCallable<T>（用來組路徑）
 *
 * 這是一個遞迴型別：每往下存取一層屬性，型別上仍然是 ProxyCallable<T>，
 * 因此可以無限鏈式存取（example.a.b.c.d...）而不會出現型別錯誤。
 */
export type ProxyCallable<T = unknown> = {
  <R = T>(query?: QueryParams, init?: RequestInit): Promise<R>;
} & {
  [K in keyof T]: ProxyCallable<T[K]>;
};

// ---------- 內部工具函式 ----------

/**
 * 將 QueryParams 物件轉成 URL query string（含開頭的 "?"）。
 * - 若 query 為空／undefined，回傳空字串。
 * - 陣列會展開成多個同名 key。
 * - null / undefined 的欄位會被跳過。
 */
function buildQueryString(query?: QueryParams): string {
  if (!query) return "";

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          params.append(key, String(item));
        }
      }
    } else {
      params.append(key, String(value));
    }
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/**
 * 正規化 baseUrl：去除結尾多餘的斜線（例如 "https://a.com///" -> "https://a.com"）。
 * 只需要在 createProxy 建立時執行一次，之後每次組路徑都可以直接重用，
 * 不用每個 request 都重新做字串處理。
 */
function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

/**
 * 將已正規化的 baseUrl 與路徑片段組合成完整 URL（不含 query string）。
 * @param normalizedBaseUrl 已去除結尾斜線的 base URL
 * @param path 路徑片段陣列，例如 ["a", "b", "c"]
 */
function joinUrl(normalizedBaseUrl: string, path: readonly string[]): string {
  if (path.length === 0) return normalizedBaseUrl;
  return `${normalizedBaseUrl}/${path.join("/")}`;
}

/**
 * 不應該被當成路徑片段攔截的「字串」屬性名稱。
 * 這些通常是 JS 引擎或框架在檢查物件時會自動存取的屬性
 * （例如 await 一個物件前會先偵測 `.then` 是否為 thenable、
 * console.log / 字串化時可能存取 toString 等），
 * 若不排除，會被誤判成使用者想組路徑 example.then.catch...，
 * 導致行為異常（例如物件被誤判為 Promise-like）。
 *
 * 注意：Symbol 類型的屬性（如 Symbol.iterator、Symbol.toPrimitive）
 * 不需要放在這裡比對，get trap 中已經用 `typeof prop === "symbol"`
 * 統一直接透傳，這裡只需要處理「字串」保留字即可。
 */
const RESERVED_STRING_KEYS = new Set<string>([
  "then",
  "catch",
  "finally",
  "toJSON",
  "toString",
  "valueOf",
]);

// ---------- 核心實作 ----------

/**
 * 建立一個以 Proxy 實作的鏈式 fetch client。
 *
 * @param baseUrl 基底網址，例如 "https://example.com"
 * @param options 客製化選項
 * @returns 可鏈式存取路徑、也可直接呼叫發出 request 的 Proxy 物件
 */
export function createProxy<T = unknown>(baseUrl: string): ProxyCallable<T> {
  // baseUrl 只需要正規化一次，之後所有節點共用這個結果。
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  /**
   * 節點快取：key 是「路徑字串」（用 "\u0000" 這種不會出現在正常 URL 片段中的
   * 字元當分隔符，避免 "a/b" 與 "a","b" 這種邊界情況互相碰撞），
   * value 是對應的 Proxy 節點。
   *
   * 目的：讓相同的路徑（例如多次存取 example.a.b）回傳同一個 Proxy 物件，
   * 而不是每次存取都 new 一個新的，減少不必要的物件配置，
   * 同時讓節點具備參照相等性，方便外部拿去做快取 key 或依賴比較。
   */
  const nodeCache = new Map<string, ProxyCallable<T>>();

  /**
   * 建立（或從快取取得）代表某個路徑的 Proxy 節點。
   * @param path 目前累積的路徑片段，例如 ["a", "b"]
   */
  function createNode(path: readonly string[]): ProxyCallable<T> {
    const cacheKey = path.join("\u0000");
    const cached = nodeCache.get(cacheKey);
    if (cached) return cached;

    /**
     * 這個節點被「呼叫」時實際發出 fetch 的邏輯。
     * @param query 會被序列化成 query string 的參數
     * @param init  原生 fetch 的 RequestInit（method、headers、body...）
     */
    const callable = async (
      query?: QueryParams,
      init?: RequestInit,
    ): Promise<unknown> => {
      const url = joinUrl(normalizedBaseUrl, path) + buildQueryString(query);
      return fetch(url, init);
    };

    const node = new Proxy(callable as unknown as ProxyCallable<T>, {
      // 讓節點可以被當函式呼叫：Proxy(callable, ...) 呼叫時進到這裡。
      apply(target, _thisArg, args: [QueryParams?, RequestInit?]) {
        return (target as unknown as typeof callable)(...args);
      },

      // 讀取屬性時，決定要「往下組路徑」還是「透傳原生行為」。
      get(target, prop, receiver) {
        // Symbol 屬性（Symbol.toPrimitive、Symbol.iterator...）一律透傳，
        // 不當作路徑片段處理。
        if (typeof prop === "symbol") {
          return Reflect.get(target, prop, receiver);
        }

        // 常見會被 JS 引擎 / 工具自動存取的字串屬性，同樣透傳，
        // 避免例如 `await proxyNode` 時因為存在 `.then` 而被誤判成 thenable。
        if (RESERVED_STRING_KEYS.has(prop)) {
          return Reflect.get(target, prop, receiver);
        }

        // 其餘任意字串屬性 -> 視為路徑片段，繼續組下一層節點。
        return createNode([...path, prop]);
      },
    });

    nodeCache.set(cacheKey, node);
    return node;
  }

  return createNode([]);
}

export default createProxy;

// ---------- 使用範例 ----------
/*
interface Route {
  id: string;
  name: string;
}

const example = createProxy<Route>("https://example.com");

// GET https://example.com
const root = await example();

// GET https://example.com/a/b/c?key=value&tags=foo&tags=bar
const nested = await example.a.b.c({ key: "value", tags: ["foo", "bar"] });

// 重複存取同一路徑會拿到同一個節點（參照相等）
console.log(example.a.b === example.a.b); // true

// 在單一呼叫覆蓋回傳型別
interface CustomResponse {
  ok: boolean;
}
const custom = await example.a.b.c<CustomResponse>(
  { key: "value" },
  { method: "POST", headers: { "Content-Type": "application/json" } }
);
*/
