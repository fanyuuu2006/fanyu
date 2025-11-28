import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { useOrder } from "./useOrder";
import { useMemo } from "react";

type Content = Record<"Newest" | "Oldest", string>;

const CONTENT: LanguageContent<Content> = {
  chinese: {
    Newest: "最新",
    Oldest: "最舊",
  },
  english: {
    Newest: "Newest",
    Oldest: "Oldest",
  },
};
export const useTimeOrderTabs = <T,>(
  data: T[],
  getDateAbleStringFunctions: ((item: T) => string)[] = [
    (item) => item as unknown as string,
  ],
  config: {
    defaultNewest?: boolean;
  } = {}
) => {
  const language = useLanguage();

  const newestCompareFunctions = useMemo(
    () =>
      getDateAbleStringFunctions.map((fn) => (a: T, b: T) => {
        const aDate = new Date(fn(a));
        const bDate = new Date(fn(b));
        return bDate.getTime() - aDate.getTime();
      }),
    [getDateAbleStringFunctions]
  );

  const oldestCompareFunctions = useMemo(
    () =>
      getDateAbleStringFunctions.map((fn) => (a: T, b: T) => {
        const aDate = new Date(fn(a));
        const bDate = new Date(fn(b));
        return aDate.getTime() - bDate.getTime();
      }),
    [getDateAbleStringFunctions]
  );

  return useOrder<T>(data, {
    Newest: {
      label: CONTENT[language.Current].Newest,
      default: config.defaultNewest,
      compareFunctions: newestCompareFunctions,
    },
    Oldest: {
      label: CONTENT[language.Current].Oldest,
      compareFunctions: oldestCompareFunctions,
    },
  });
};
