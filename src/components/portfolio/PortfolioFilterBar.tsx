"use client";
import { tagCategories } from "@/libs/portfolio";
import { SortOrder } from "@/hooks/usePortfolioParams";
import { cn } from "@/utils/className";
import { useCallback, useId, useState } from "react";
import CloseOutlinedSvg from "../svgs/CloseOutlinedSvg";
import FilterOutlinedSvg from "../svgs/FilterOutlinedSvg";
import SearchOutlinedSvg from "../svgs/SearchOutlinedSvg";
import ArrowUpOutlinedSvg from "../svgs/ArrowUpOutlinedSvg";
import { useModal } from "@/hooks/useModal";

const CATEGORY_LABELS: Record<keyof typeof tagCategories, string> = {
  languages: "語言",
  frontend: "前端",
  backend: "後端",
  database: "資料庫",
  visualization: "視覺化",
  platforms: "平台",
  tools: "工具",
  roles: "角色",
  api: "API",
  data: "資料處理",
  packages: "套件",
};

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
  const modal = useModal({});
  const [searchString, setSearchString] = useState(query);
  const [previousQuery, setPreviousQuery] = useState(query);
  if (query !== previousQuery) {
    setSearchString(query);
    setPreviousQuery(query);
  }

  const searchInputId = useId();
  const filterPanelTitleId = useId();

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
                placeholder="搜尋專案、描述、標籤、日期..."
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
                type="button"
                onClick={modal.open}
                aria-haspopup="dialog"
                className={cn(
                  "btn flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-sm",
                  {
                    "border-(--primary) text-(--primary)": hasActive,
                  },
                )}
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
        <modal.Container
          aria-labelledby={filterPanelTitleId}
          className="flex items-center justify-center p-4"
        >
          <div className="card flex max-h-[75vh] w-full max-w-md flex-col overflow-hidden rounded-xl sm:max-w-2xl lg:max-w-3xl">
            {/* Header */}
            <div
              id={filterPanelTitleId}
              className="flex shrink-0 items-center justify-between bg-(--secondary-background) px-4 py-2"
            >
              <h4 className="flex items-center gap-1.5 text-sm font-semibold">
                <FilterOutlinedSvg aria-hidden className="text-(--muted)" />
                篩選標籤
              </h4>
              <button
                type="button"
                onClick={modal.close}
                aria-label="關閉篩選面板"
                title="關閉篩選面板"
              >
                <CloseOutlinedSvg aria-hidden />
              </button>
            </div>

            {/* Body：分類群組 */}
            <div className="grid grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_ENTRIES.map(([category, categoryTags]) => {
                if (categoryTags.length === 0) return null;
                return (
                  <div
                    key={category}
                    className="flex flex-col gap-2 py-2 first:pt-0 last:pb-0 sm:py-0"
                  >
                    <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-(--muted)">
                      <span
                        className="size-1 rounded-full bg-(--primary)"
                        aria-hidden
                      />
                      {CATEGORY_LABELS[category]}
                    </span>
                    <div className="flex flex-wrap gap-2">
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
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex shrink-0 items-center justify-between border-t border-(--border) px-4 py-2.5">
              <span className="text-xs text-(--muted)">
                {hasActive ? `已選取 ${tags.size} 個標籤` : "尚未選取標籤"}
              </span>
              {hasActive && (
                <button
                  type="button"
                  onClick={onClearTags}
                  className="flex items-center gap-1 text-xs text-(--muted) hover:text-(--foreground) transition-all duration-300"
                >
                  <CloseOutlinedSvg aria-hidden />
                  <span>清除全部</span>
                </button>
              )}
            </div>
          </div>
        </modal.Container>
      </div>
    </section>
  );
};
