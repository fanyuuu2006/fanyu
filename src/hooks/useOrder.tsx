import { cn } from "@/utils/className";
import { useCallback, useMemo, useState } from "react";

export const useOrder = <T,>(
  data: T[],
  config: Record<
    string,
    {
      label: React.ReactNode;
      default?: boolean;
      compareFunctions: ((a: T, b: T) => number)[];
    }
  >
): {
  data: T[];
  div: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>>;
  curr: string;
  setCurr: React.Dispatch<React.SetStateAction<string>>;
} => {
  const entries = useMemo(() => Object.entries(config), [config]);

  const [currTag, setCurrTag] = useState<string>(
    entries.find(([, value]) => value.default === true)?.[0] || entries[0][0]
  );
  const currConfig = useMemo(() => config[currTag], [config, currTag]);
  const stableData = useMemo(() => data, [data]);
  const sortedData = useMemo(() => {
    const sorted = [...stableData];
    for (const compareFn of currConfig.compareFunctions.reverse()) {
      sorted.sort(compareFn);
    }
    return sorted;
  }, [currConfig, stableData]);

  const Div = useCallback(
    ({ className, ...rest }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
      return (
        <div
          role="tablist"
          className={cn(`flex gap-1 bg-[#000] rounded-xl p-1`, className)}
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
    },
    [entries, currTag, setCurrTag]
  );

  return {
    data: sortedData,
    div: Div,
    curr: currTag,
    setCurr: setCurrTag,
  };
};
