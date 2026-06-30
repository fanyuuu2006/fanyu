export const fetcher = <T,>(url: string) =>
  fetch(url).then((res) => res.json() as Promise<T>);
export const slugify = (s: string) => encodeURIComponent(s);
export const deslugify = (s: string) => decodeURIComponent(s);
