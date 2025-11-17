import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/className";
import { useMemo, useState } from "react";
import { LanguageOption } from "../types/language";

export const useOrder = <T,>(
  data: T[],
  config: Record<
    string,
    {
      label: Record<LanguageOption, string>;
      default: boolean | undefined;
      handler: (item: T) => number;
    }
  >
): {
  data: T[];
  div: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>>;
} => {
  const language = useLanguage();
  const [currTag, setCurrTag] = useState<string>(
    Object.entries(config).find(([, value]) => value.default === true)?.[0] ||
      Object.keys(config)[0]
  );
  const currConfig = config[currTag];

  const sortedData = useMemo(() => {
    return data.toSorted((a, b) => {
      const aValue = currConfig.handler(a);
      const bValue = currConfig.handler(b);
      return aValue - bValue;
    });
  }, [currConfig, data]);

  const Div = ({
    className,
    ...rest
  }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        role="tablist"
        className={cn("grid grid-cols-2 bg-[#000] rounded-xl p-1", className)}
        {...rest}
      >
        {Object.entries(config).map(([key, value]) => {
          const isSelected = currTag === key;
          return (
            <button
              key={value.label[language.Current]}
              className={`w-full px-3 py-1 transition-all duration-200 rounded-[inherit] ${
                isSelected ? "btn" : ""
              }`}
              onClick={() => {
                if (isSelected) return;
                setCurrTag(key);
              }}
            >
              {value.label[language.Current]}
            </button>
          );
        })}
      </div>
    );
  };

  Div.displayName = "Order.Div";

  return {
    data: sortedData,
    div: Div,
  };
};
