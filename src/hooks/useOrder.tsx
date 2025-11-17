import { cn } from "@/utils/className";
import { useMemo, useState } from "react";

export const useOrder = <T,>(
  data: T[],
  config: Record<
    string,
    {
      label: React.ReactNode;
      default?: boolean;
      compareFn: (a: T, b: T) => number;
    }
  >
): {
  data: T[];
  div: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>>;
} => {
  const entries = Object.entries(config);
  const [currTag, setCurrTag] = useState<string>(
    entries.find(([, value]) => value.default === true)?.[0] || entries[0][0]
  );
  const currConfig = config[currTag];

  const sortedData = useMemo(() => {
    return data.toSorted(currConfig.compareFn);
  }, [currConfig, data]);

  const Div = ({
    className,
    ...rest
  }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        role="tablist"
        className={cn(
          `flex gap-1 bg-[#000] rounded-xl p-1`,
          className
        )}
        {...rest}
      >
        {entries.map(([key, value]) => {
          const isSelected = currTag === key;
          return (
            <button
              key={key}
              className={`flex-1 basis-auto shrink-0 px-3 py-1 transition-all duration-200 rounded-[inherit] ${
                isSelected ? "btn" : ""
              }`}
              onClick={() => {
                if (isSelected) return;
                setCurrTag(key);
              }}
            >
              {value.label}
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
