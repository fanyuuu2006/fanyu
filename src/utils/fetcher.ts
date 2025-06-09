export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Fetch ${url} failed`);
    return res.json();
  });
