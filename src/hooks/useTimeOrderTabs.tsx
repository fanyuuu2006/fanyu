import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { useOrder } from "./useOrder";

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
  getDateAbleString: (item: T) => string = (item) => item as unknown as string
) => {
  const language = useLanguage();

  return useOrder<T>(data, {
    Newest: {
      label: CONTENT[language.Current].Newest,
      default: true,
      compareFn: (a, b) => {
        const aDate = new Date(getDateAbleString(a));
        const bDate = new Date(getDateAbleString(b));
        return bDate.getTime() - aDate.getTime();
      },
    },
    Oldest: {
      label: CONTENT[language.Current].Oldest,
      compareFn: (a, b) => {
        const aDate = new Date(getDateAbleString(a));
        const bDate = new Date(getDateAbleString(b));
        return aDate.getTime() - bDate.getTime();
      },
    },
  });
};
