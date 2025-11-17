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
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

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

  const handleClearSearch = useCallback(() => {
    setInputValue("");
    setSearchString("");
  }, []);

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

        {/* 查詢區塊 */}
        <div className="w-full max-w-2xl px-4">
          {/* 搜尋輸入框 */}
          <div className="relative group">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-color-muted)] text-lg pointer-events-none group-focus-within:text-[var(--text-color-primary)] transition-colors duration-200" />
            <input
              type="text"
              className="text-base sm:text-lg w-full px-12 py-3 rounded-xl border border-[var(--border-color)] placeholder:text-[var(--text-color-muted)] focus:border-[var(--border-color-focus)] focus-visible:border-[var(--border-color-focus)] transition-all duration-200"
              placeholder={bgcContent.inputPlaceholder}
              value={inputValue}
              onChange={handleSearch}
            />

            {/* 清除按鈕 */}
            {inputValue && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-color-muted)] hover:text-[var(--text-color)] transition-colors duration-200 p-1.5 rounded-full hover:bg-[var(--background-color-tertiary)] active:bg-[var(--background-color-quaternary)]"
                onClick={handleClearSearch}
                aria-label={bgcContent.clear}
              >
                <CloseOutlined className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {order.data.length === 0 ? (
          <div className="text-3xl font-bold">{bgcContent.noData}</div>
        ) : (
          <>
            <order.div />
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 px-4 sm:px-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[var(--text-color-muted)] text-sm sm:text-base">
                  {bgcContent.total.replace(
                    "{count}",
                    order.data.length.toString()
                  )}
                </span>
              </div>
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
