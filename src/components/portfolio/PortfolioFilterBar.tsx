"use client";
import { tagCategories } from "@/libs/portfolio";
import { usePortfolioParams } from "@/hooks/usePortfolioParams";
import { cn } from "@/utils/className";
import { Collapse } from "fanyucomponents";
import { useCallback, useState } from "react";
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

export const PortfolioFilterBar = () => {
  const { params, setQuery, toggleTag, clearTags, toggleSort } =
    usePortfolioParams();
  const { tags, query, sort } = params;

  const [filterShow, setFilterShow] = useState(tags.size > 0);
  const [searchString, setSearchString] = useState(query);

  const handleSearch = useCallback(() => {
    setQuery(searchString);
  }, [searchString, setQuery]);

  const hasActive = tags.size > 0;

  return (
    <section>
      <div className="container flex flex-col gap-4">
        <div className="flex flex-col gap-1 px-1">
          <p className="text-sm font-medium text-(--foreground)">
            搜尋與篩選工具
          </p>
          <p className="text-sm text-(--muted)">
            用關鍵字、標籤與排序快速縮小作品範圍。
          </p>
        </div>

        {/* Toolbar */}
        <div className="card rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            {/* Search */}
            <label
              htmlFor="portfolio-search-input"
              className="flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 transition-all duration-300 hover:border-(--primary)"
            >
              <input
                id="portfolio-search-input"
                type="search"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="搜尋專案..."
                className="w-full bg-transparent outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchString("");
                    setQuery("");
                  }}
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
                onClick={toggleSort}
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
                aria-controls="filter-panel"
              >
                <FilterOutlinedSvg aria-hidden />
                <span>篩選</span>
                {hasActive && (
                  <span className="ml-0.5 text-xs opacity-75">
                    ({tags.size})
                  </span>
                )}
              </button>

              {/* Clear */}
              {hasActive && (
                <button
                  onClick={clearTags}
                  className="flex shrink-0 items-center gap-1 px-1 text-sm text-(--muted) transition-all duration-300 hover:text-(--foreground)"
                >
                  <CloseOutlinedSvg aria-hidden />
                  <span>清除</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <Collapse
          id="filter-panel"
          state={filterShow}
          className="slide-collapse"
          as="div"
        >
          <div className="flex flex-col gap-3 rounded-2xl p-4">
            {Object.entries(tagCategories).map(([category, categoryTags]) => (
              <div key={category} className="flex flex-col gap-2">
                <span className="shrink-0 text-xs font-semibold text-(--muted)">
                  {CATEGORY_LABELS[category as keyof typeof tagCategories]}
                </span>
                <div className="flex flex-wrap gap-1">
                  {categoryTags.map((tag) => {
                    const isActive = tags.has(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "btn rounded-full px-3 py-1 text-xs sm:text-sm font-mono",
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
        </Collapse>
      </div>
    </section>
  );
};
