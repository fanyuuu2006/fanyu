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

  return [ minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
};


export const normalize = (str: string) => str.toLowerCase().trim();
