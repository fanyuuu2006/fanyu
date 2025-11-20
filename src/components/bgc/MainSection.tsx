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
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useDebounce } from "@/hooks/useDebounce";

type BgcContent = Record<
  | "bgc"
  | "noData"
  | "total"
  | "newest"
  | "oldest"
  | "recommended"
  | "inputPlaceholder"
  | "clear"
  | "canNotFind"
  | "noBoardGame",
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
    clear: "清除搜尋",
    canNotFind: `找不到包含「{string}」的桌遊，試試其他關鍵字吧！`,
    noBoardGame: "目前沒有可顯示的桌遊資料",
  },
  english: {
    bgc: "Board Game Club",
    noData: "No Data",
    total: "Total {count} games",
    newest: "Newest",
    oldest: "Oldest",
    recommended: "Recommended",
    inputPlaceholder: "Search...",
    clear: "Clear Search",
    canNotFind: `No matching board games found for "{string}", try other keywords!`,
    noBoardGame: "No board game data available",
  },
};

export type MainSectionProps = {
  data: BoardGameResponse;
};

// 自定義 debounce hook，確保正確清理

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const bgcContent = BGC_CONTENT[Language.Current];
  const [searchString, setSearchString] = useState("");
  const [inputValue, setInputValue] = useState("");

  const boardGames = useMemo(() => data.data, [data.data]);

  const searchableData = useMemo(
    () =>
      boardGames.map((item) => ({
        item,
        searchText: normalize(bgc.stringify(item)),
      })),
    [boardGames]
  );

  // 優化：使用 useMemo 快取過濾結果
  const filteredData = useMemo(() => {
    if (!searchString) return boardGames;
    const normalizedSearch = normalize(searchString);
    return searchableData
      .filter(({ searchText }) => searchText.includes(normalizedSearch))
      .map(({ item }) => item);
  }, [searchableData, searchString, boardGames]);

  const debouncedSearch = useDebounce(setSearchString, 500);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchString("");
    setInputValue("");
  }, []);

  const noResultMessage = useMemo(
    () =>
      searchString
        ? bgcContent.canNotFind.replace("{string}", searchString)
        : bgcContent.noBoardGame,
    [bgcContent.canNotFind, bgcContent.noBoardGame, searchString]
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

  // 優化：快取字串替換邏輯
  const totalCountText = useMemo(
    () => bgcContent.total.replace("{count}", order.data.length.toString()),
    [bgcContent.total, order.data.length]
  );

  return (
    <section
      id="hero"
      className="h-full"
      style={
        {
          "--bg": `url("/api/album/image/10YJQZuJ4eBtNStqgj9OdsMbByrtWOoJ3")`,
        } as React.CSSProperties
      }
    >
      <div className="container flex flex-col items-center">
        <Title>{bgcContent.bgc}</Title>

        {/* 查詢區塊 */}
        <div className="w-full max-w-2xl px-4">
          {/* 搜尋輸入框 */}
          <div className="relative group">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-color-muted)] text-lg pointer-events-none group-focus-within:text-[var(--text-color-primary)] transition-colors duration-200" />
            <input
              type="text"
              className="
              text-base sm:text-lg w-full px-12 py-3 rounded-xl 
              outline outline-[var(--border-color)] bg-[#000]
              placeholder:text-[var(--text-color-muted)] 
              focus:outline-[var(--text-color-primary)]
              hover:outline-[var(--border-color-hover)]
              transition-all duration-200
              "
              placeholder={bgcContent.inputPlaceholder}
              value={inputValue}
              onChange={handleSearch}
            />
            {/* 清除按鈕 */}
            {inputValue && (
              <button
                type="button"
                className="text-sm absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-color-muted)] hover:text-[var(--text-color)] transition-colors duration-200 p-1.5 rounded-full hover:bg-[var(--background-color-tertiary)] active:bg-[var(--background-color-quaternary)]"
                onClick={handleClearSearch}
                aria-label={bgcContent.clear}
              >
                <CloseOutlined />
              </button>
            )}
          </div>
        </div>

        {order.data.length === 0 ? (
          <div className="card max-w-lg flex flex-col gap-4 items-center justify-center text-center p-12">
            {/* 圖示 */}
            <div className="opacity-60">
              <SearchOutlined className="text-6xl text-[var(--text-color-muted)]" />
            </div>

            {/* 主要訊息 */}
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-color)]">
              {bgcContent.noData}
            </h3>

            {/* 提示訊息 */}
            <p className="text-[var(--text-color-muted)] text-lg leading-relaxed">
              {noResultMessage}
            </p>

            {/* 清除搜尋按鈕（僅在有搜尋時顯示） */}
            {searchString && (
              <button
                onClick={handleClearSearch}
                className="px-6 py-3 rounded-2xl btn-primary font-medium"
              >
                {bgcContent.clear}
              </button>
            )}
          </div>
        ) : (
          <>
            <order.div />
            <div className="w-full flex mb-4 px-4">
                <span className="text-sm sm:text-base">
                  {totalCountText}
                </span>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
