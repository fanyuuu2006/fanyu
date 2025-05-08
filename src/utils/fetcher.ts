export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Fetch ${url} failed`);
    return res.json();
  });
