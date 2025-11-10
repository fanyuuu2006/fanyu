export const slugify = (s: string) => encodeURIComponent(s);
export const deslugify = (s: string) => decodeURIComponent(s);
export const proxyUrl = (url: string) => `/api/proxy?url=${encodeURIComponent(url)}`;