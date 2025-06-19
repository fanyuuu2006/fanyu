import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { ProjectTagCategory } from "@/types/portfolio";
import { useState } from "react";

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

export const useTimeOrderTabs = (initOption?: { init: boolean }) => {
  const [isOrderByNewest, setIsOrderByNewest] = useState<boolean>(
    initOption?.init ?? true
  );
  const Language = useLanguage();
  const content = getContent(Language.Current);

  const Div = ({
    className,
    ...rest
  }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        role="tablist"
        className={`${className} flex bg-[var(--background-color-dark)] rounded-lg p-1`}
        {...rest}
      >
        {[
          { label: content.Newest, value: true },
          { label: content.Oldest, value: false },
        ].map((item) => {
          const isSelected = isOrderByNewest === item.value;
          return (
            <button
              key={item.label}
              className={`px-4 py-1 transition-colors duration-200 rounded-lg ${
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
    isOrderByNewest,
    Div,
  };
};

