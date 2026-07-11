"use client";
import { tagCategories } from "@/libs/portfolio";
import { SortOrder } from "@/hooks/usePortfolioParams";
import { cn } from "@/utils/className";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import CloseOutlinedSvg from "../svgs/CloseOutlinedSvg";
import FilterOutlinedSvg from "../svgs/FilterOutlinedSvg";
import SearchOutlinedSvg from "../svgs/SearchOutlinedSvg";
import ArrowUpOutlinedSvg from "../svgs/ArrowUpOutlinedSvg";

const CATEGORY_LABELS: Record<keyof typeof tagCategories, string> = {
  languages: "語言",
  frontend: "前端",
  backend: "後端",
  database: "資料庫",
  automation: "自動化",
  visualization: "視覺化",
  platforms: "平台",
  tools: "工具",
  roles: "角色",
  other: "其他",
};

// 靜態資料，搬到 component 外面只計算一次
const CATEGORY_ENTRIES = Object.entries(tagCategories) as [
  keyof typeof tagCategories,
  readonly string[],
][];

type PortfolioFilterBarProps = React.HTMLAttributes<HTMLElement> & {
  query: string;
  tags: ReadonlySet<string>;
  sort: SortOrder;
  onQueryChange(query: string): void;
  onToggleTag(tag: string): void;
  onClearTags(): void;
  onSortToggle(): void;
};

export const PortfolioFilterBar = ({
  query,
  tags,
  sort,
  onQueryChange,
  onToggleTag,
  onClearTags,
  onSortToggle,
  ...rest
}: PortfolioFilterBarProps) => {
  const [filterShow, setFilterShow] = useState(tags.size > 0);
  const [searchString, setSearchString] = useState(query);
  const [previousQuery, setPreviousQuery] = useState(query);
  if (query !== previousQuery) {
    setSearchString(query);
    setPreviousQuery(query);
  }

  const searchInputId = useId();
  const filterPanelId = useId();

  const panelRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  // 點擊外部或按 Esc 關閉篩選面板
  useEffect(() => {
    if (!filterShow) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        filterButtonRef.current?.contains(target)
      ) {
        return;
      }
      setFilterShow(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFilterShow(false);
        filterButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filterShow]);

  const handleSearch = useCallback(() => {
    onQueryChange(searchString.trim());
  }, [searchString, onQueryChange]);

  const handleClearSearch = useCallback(() => {
    setSearchString("");
    onQueryChange("");
  }, [onQueryChange]);

  const hasActive = tags.size > 0;

  return (
    <section {...rest}>
      <div className="container relative flex flex-col gap-4">
        {/* Toolbar */}
        <div className="card rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            {/* Search */}
            <label
              htmlFor={searchInputId}
              className="flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 transition-all duration-300 hover:border-(--primary)"
            >
              <input
                id={searchInputId}
                type="search"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="搜尋專案、描述、標籤..."
                className="w-full bg-transparent outline-none"
              />
              {searchString && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="清除搜尋"
                  title="清除搜尋"
                >
                  <CloseOutlinedSvg aria-hidden className="shrink-0" />
                </button>
              )}
              <button
                type="button"
                onClick={handleSearch}
                aria-label="搜尋專案"
                title="搜尋專案"
              >
                <SearchOutlinedSvg aria-hidden className="shrink-0" />
              </button>
            </label>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <button
                type="button"
                onClick={onSortToggle}
                className="btn flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-sm"
                aria-label={
                  sort === "newest" ? "目前：最新優先" : "目前：最舊優先"
                }
                title={sort === "newest" ? "目前：最新優先" : "目前：最舊優先"}
              >
                <ArrowUpOutlinedSvg
                  aria-hidden
                  className={cn("transition-transform duration-300", {
                    "rotate-180": sort === "oldest",
                  })}
                />
                <span>{sort === "newest" ? "最新" : "最舊"}</span>
              </button>

              {/* Filter toggle */}
              <button
                ref={filterButtonRef}
                type="button"
                onClick={() => setFilterShow((prev) => !prev)}
                className={cn(
                  "btn flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-sm",
                  {
                    "border-(--primary) text-(--primary)":
                      filterShow || hasActive,
                  },
                )}
                aria-label={filterShow ? "關閉篩選面板" : "開啟篩選面板"}
                aria-expanded={filterShow}
                aria-controls={filterPanelId}
              >
                <FilterOutlinedSvg aria-hidden />
                <span>篩選</span>
                {hasActive && (
                  <span className="ml-0.5 text-xs opacity-75">
                    ({tags.size})
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {filterShow && (
          <div
            ref={panelRef}
            id={filterPanelId}
            role="region"
            aria-label="標籤篩選面板"
            className="absolute top-full right-0 z-20 w-full px-4"
          >
            <div className="card flex max-h-[70vh] flex-col overflow-hidden rounded-xl sm:max-h-96">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-4 py-3">
                <span className="text-sm font-semibold">
                  篩選標籤
                  {hasActive && (
                    <span className="ml-1.5 font-normal text-(--muted)">
                      ({tags.size})
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setFilterShow(false)}
                  aria-label="關閉篩選面板"
                  title="關閉篩選面板"
                  className="text-(--muted) transition-colors duration-200 hover:text-(--foreground)"
                >
                  <CloseOutlinedSvg aria-hidden />
                </button>
              </div>

              {/* Body：分類群組 */}
              <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto p-4 sm:grid-cols-2">
                {CATEGORY_ENTRIES.map(([category, categoryTags]) => (
                  <div key={category} className="flex flex-col gap-2">
                    <span className="shrink-0 text-xs font-semibold text-(--muted)">
                      {CATEGORY_LABELS[category]}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {categoryTags.map((tag) => {
                        const isActive = tags.has(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => onToggleTag(tag)}
                            className={cn(
                              "btn rounded-full px-3 py-1 text-xs font-mono sm:text-sm",
                              { primary: isActive },
                            )}
                            aria-pressed={isActive}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer：清除全部 */}
              {hasActive && (
                <div className="flex shrink-0 justify-end border-t border-(--border) px-4 py-2.5">
                  <button
                    type="button"
                    onClick={onClearTags}
                    className="flex items-center gap-1 text-sm text-(--muted) transition-colors duration-200 hover:text-(--foreground)"
                  >
                    <CloseOutlinedSvg aria-hidden />
                    <span>清除全部</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
