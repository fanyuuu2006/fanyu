import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { ProjectTagCategory } from "@/types/portfolio";
import { useMemo, useState } from "react";

type ProjectsContent = Record<"Newest" | "Oldest" | ProjectTagCategory, string>;

const getContent = (language: LanguageOption): ProjectsContent =>
  ((
    {
      chinese: {
        Newest: "最新",
        Oldest: "最舊",
      },
      english: {
        Newest: "Newest",
        Oldest: "Oldest",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export const useTimeOrderTabs = <T,>(
  data: T[],
  getDateAbleString: (item: T) => string = (item) => item as unknown as string,
  initOption?: { init: boolean }
): {
  sortedData: T[];
  Div: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>>;
} => {
  const [isOrderByNewest, setIsOrderByNewest] = useState<boolean>(
    initOption?.init ?? true
  );
  const Language = useLanguage();
  const content = getContent(Language.Current);

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      const aDate = new Date(getDateAbleString(a));
      const bDate = new Date(getDateAbleString(b));
      return isOrderByNewest
        ? bDate.getTime() - aDate.getTime()
        : aDate.getTime() - bDate.getTime();
    });
  }, [data, getDateAbleString, isOrderByNewest]);

  const Div = ({
    className,
    ...rest
  }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        role="tablist"
        className={`${className} grid grid-cols-2 bg-[#000] rounded-xl p-1`}
        {...rest}
      >
        {[
          { label: content.Oldest, value: false },
          { label: content.Newest, value: true },
        ].map((item) => {
          const isSelected = isOrderByNewest === item.value;
          return (
            <button
              key={item.label}
              className={`w-full px-4 py-1 transition-all duration-200 rounded-[inherit] ${
                isSelected ? "btn" : ""
              }`}
              onClick={() => {
                if (isSelected) return;
                setIsOrderByNewest(item.value);
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  };

  Div.displayName = "TimeOrderTabs.Div";

  return {
    sortedData,
    Div,
  };
};
