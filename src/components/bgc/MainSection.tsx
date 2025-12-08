"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { Title } from "../custom/Title";
import { BoardGameResponse } from "@/types/bgc";
import { BoardGameCard } from "./BoardGameCard";
import { useOrder } from "@/hooks/useOrder";
import { useCallback, useState, useMemo, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import bgc from "@/utils/bgc";
import { normalize } from "../../utils/index";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

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

export const MainSection = ({ data }: MainSectionProps) => {
  const { Current: currentLang } = useLanguage();
  const bgcContent = BGC_CONTENT[currentLang];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 獲取 URL 中的搜尋參數
  const searchString = searchParams.get("search") || "";

  // 本地輸入狀態
  const [inputValue, setInputValue] = useState(searchString);
  
  // 效能優化：使用 useTransition 確保搜尋導航不會阻塞 UI 渲染
  const [isPending, startTransition] = useTransition();

  // 當 URL 參數改變時，同步回輸入框 (例如點擊上一頁)
  useEffect(() => {
    setInputValue(searchString);
  }, [searchString]);

  // 效能優化：快取原始資料
  const boardGames = useMemo(() => data.data, [data.data]);

  // 效能優化：預先計算搜尋索引
  // 避免在每次過濾時都重新執行昂貴的 stringify 和 normalize 操作
  const searchableData = useMemo(
    () =>
      boardGames.map((item) => ({
        item,
        searchText: normalize(bgc.stringify(item)),
      })),
    [boardGames]
  );

  // 效能優化：快取過濾結果
  // 僅在搜尋字串或資料改變時重新計算
  const filteredData = useMemo(() => {
    if (!searchString) return boardGames;
    const normalizedSearch = normalize(searchString);
    return searchableData
      .filter(({ searchText }) => searchText.includes(normalizedSearch))
      .map(({ item }) => item);
  }, [searchableData, searchString, boardGames]);

  // 邏輯簡化：統一處理 URL 更新
  const updateSearchParam = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      
      // 使用 startTransition 標記為非緊急更新
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      });
    },
    [searchParams, pathname, router]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    updateSearchParam(inputValue);
  }, [updateSearchParam, inputValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  const handleClearSearch = useCallback(() => {
    setInputValue("");
    updateSearchParam("");
  }, [updateSearchParam]);

  // 效能優化：快取無結果訊息
  const noResultMessage = useMemo(
    () =>
      searchString
        ? bgcContent.canNotFind.replace("{string}", searchString)
        : bgcContent.noBoardGame,
    [bgcContent, searchString]
  );

  const order = useOrder(filteredData, {
    newest: {
      label: bgcContent.newest,
      default: true,
      compareFunctions: [(a, b) => b.id - a.id],
    },
    oldest: {
      label: bgcContent.oldest,
      compareFunctions: [(a, b) => a.id - b.id],
    },
    recommended: {
      label: bgcContent.recommended,
      compareFunctions: [
        (a, b) => b.recommendedCounts - a.recommendedCounts,
        (a, b) => b.id - a.id,
      ],
    },
  });

  // 效能優化：快取計數文字
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
          "--bg": `url("/api/album/item/10YJQZuJ4eBtNStqgj9OdsMbByrtWOoJ3")`,
        } as React.CSSProperties
      }
    >
      <div className="container flex flex-col items-center">
        <Title>{bgcContent.bgc}</Title>

        {/* 查詢區塊 */}
        <div className="w-full max-w-2xl px-4">
          {/* 搜尋輸入框 */}
          <div className="relative group">
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-(--text-color-muted) text-lg hover:text-(--text-color-primary) transition-colors duration-200 p-1 cursor-pointer"
              onClick={handleSearchSubmit}
              aria-label="Search"
              disabled={isPending} // 搜尋中禁用
            >
              <SearchOutlined className={isPending ? "animate-spin" : ""} />
            </button>
            <input
              type="text"
              className="
              text-base sm:text-lg w-full px-12 py-3 rounded-xl 
              outline outline-(--border-color) bg-black
              placeholder:text-(--text-color-muted) 
              focus:outline-(--text-color-primary)
              hover:outline-(--border-color-hover)
              transition-all duration-200
              "
              placeholder={bgcContent.inputPlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {/* 清除按鈕 */}
            {inputValue && (
              <button
                type="button"
                className="text-sm absolute right-3 top-1/2 transform -translate-y-1/2 text-(--text-color-muted) hover:text-(--text-color) transition-colors duration-200 p-1.5 rounded-full hover:bg-(--background-color-tertiary) active:bg-(--background-color-quaternary)"
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
              <SearchOutlined className="text-6xl text-(--text-color-muted)" />
            </div>

            {/* 主要訊息 */}
            <h3 className="text-2xl sm:text-3xl font-bold text-(--text-color)">
              {bgcContent.noData}
            </h3>

            {/* 提示訊息 */}
            <p className="text-(--text-color-muted) text-lg leading-relaxed">
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
              <span className="text-sm sm:text-base">{totalCountText}</span>
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
