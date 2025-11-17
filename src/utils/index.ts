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

export const normalize = (str: string) => str.toLowerCase().trim();
