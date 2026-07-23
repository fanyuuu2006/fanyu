"use client";
import { SortOrder } from "@/hooks/usePortfolioParams";
import { cn } from "@/utils/className";
import { useCallback, useId, useState } from "react";
import CloseOutlinedSvg from "../svgs/CloseOutlinedSvg";
import SearchOutlinedSvg from "../svgs/SearchOutlinedSvg";
import ArrowUpOutlinedSvg from "../svgs/ArrowUpOutlinedSvg";
type PortfolioFilterBarProps = React.HTMLAttributes<HTMLElement> & {
  query: string;
  sort: SortOrder;
  onQueryChange(query: string): void;
  onSortToggle(): void;
};

export const PortfolioFilterBar = ({
  query,
  sort,
  onQueryChange,
  onSortToggle,
  ...rest
}: PortfolioFilterBarProps) => {
  const [searchString, setSearchString] = useState(query);
  const [previousQuery, setPreviousQuery] = useState(query);
  if (query !== previousQuery) {
    setSearchString(query);
    setPreviousQuery(query);
  }

  const searchInputId = useId();

  const handleSearch = useCallback(() => {
    onQueryChange(searchString.trim());
  }, [searchString, onQueryChange]);

  const handleClearSearch = useCallback(() => {
    setSearchString("");
    onQueryChange("");
  }, [onQueryChange]);

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
