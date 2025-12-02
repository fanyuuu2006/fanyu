import { LanguageOption } from "@/types/language";

export const fetcher = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, init).then((res) => res.json());

export const formatDate = (
  time: string | number | Date,
  language: LanguageOption | undefined = "chinese"
) =>
  new Date(time).toLocaleString(
    {
      chinese: "zh-TW",
      english: "en-US",
    }[language],
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

export const formatTime = (millis: string): string => {
  const totalSeconds = Math.floor(Number(millis) / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds].map((v) => String(v).padStart(2, "0")).join(":");
};

export const normalize = (str: string) => str.toLowerCase().trim();

export const asyncPool = async <T, R>(
  poolLimit: number,
  items: T[],
  iteratorFn: (item: T, items: T[]) => Promise<R>
): Promise<R[]> => {
  const ret: Promise<R>[] = [];
  const executing: Promise<void>[] = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => iteratorFn(item, items));
    ret.push(p);
    if (poolLimit <= items.length) {
      const e: Promise<void> = p.then(() => {
        executing.splice(executing.indexOf(e), 1);
      });
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
};
