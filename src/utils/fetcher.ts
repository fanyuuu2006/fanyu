export const fetcher = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, init).then((res) => {
    if (!res.ok) throw new Error(`Fetch ${url} failed`);
    return res.json();
  });
