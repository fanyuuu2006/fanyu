export const fetcher = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, init).then((res) => res.json());
