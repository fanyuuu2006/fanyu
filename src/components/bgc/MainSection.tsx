"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { Title } from "../custom/Title";
import { BoardGameResponse } from "@/types/bgc";
import { BoardGameCard } from "./BoardGameCard";
import { useOrder } from "@/hooks/useOrder";
import { useCallback, useState, useMemo } from "react";
import bgc from "@/utils/bgc";
import { normalize } from "../../utils/index";
import { debounce } from "lodash";

type BgcContent = Record<
  | "bgc"
  | "noData"
  | "total"
  | "newest"
  | "oldest"
  | "recommended"
  | "inputPlaceholder"
  | "clear",
  string
>;
const BGC_CONTENT: LanguageContent<BgcContent> = {
  chinese: {
    bgc: "桌上遊戲研究社",
    noData: "沒有資料",
    total: "共 {count} 款桌遊",
    newest: "最新",
    oldest: "最舊",
    recommended: "推薦度",
    inputPlaceholder: "搜尋...",
    clear: "清除",
  },
  english: {
    bgc: "Board Game Club",
    noData: "No Data",
    total: "Total {count} games",
    newest: "Newest",
    oldest: "Oldest",
    recommended: "Recommended",
    inputPlaceholder: "Search...",
    clear: "Clear",
  },
};

export type MainSectionProps = {
  data: BoardGameResponse;
};

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const bgcContent = BGC_CONTENT[Language.Current];
  const [searchString, setSearchString] = useState("");
  const [inputValue, setInputValue] = useState("");

  const filteredData = data.data.filter((item) =>
    normalize(bgc.stringify(item)).includes(normalize(searchString))
  );

  // 使用 debounce 延遲 300ms 後才執行搜索
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchString(value);
      }, 300),
    []
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const order = useOrder(filteredData, {
    newest: {
      label: bgcContent.newest,
      default: true,
      compareFn: (a, b) => b.id - a.id,
    },
    oldest: {
      label: bgcContent.oldest,
      compareFn: (a, b) => a.id - b.id,
    },
    recommended: {
      label: bgcContent.recommended,
      compareFn: (a, b) => b.recommendedCounts - a.recommendedCounts,
    },
  });

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Title>{bgcContent.bgc}</Title>
        {/* 查詢 */}
        <div className="w-full md:w-1/2 flex justify-center gap-1">
          <input
            type="text"
            className="w-full p-2 border border-[var(--border-color)] rounded-lg"
            placeholder={bgcContent.inputPlaceholder}
            value={inputValue}
            onChange={handleSearch}
          />
          <button
            className="btn rounded-2xl p-3 whitespace-nowrap"
            onClick={() =>
              handleSearch({
                currentTarget: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            {bgcContent.clear}
          </button>
        </div>

        {order.data.length === 0 ? (
          <div className="text-3xl font-bold">{bgcContent.noData}</div>
        ) : (
          <>
            <order.div />
            <div className="w-full flex items-center gap-1">
              <span className="text-[var(--text-color-muted)]">
                {bgcContent.total.replace(
                  "{count}",
                  order.data.length.toString()
                )}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {order.data.map((item) => (
                <BoardGameCard
                  key={item.id}
                  id={item.id.toString()}
                  item={item}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
