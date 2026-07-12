"use client";
import { PAGE_SIZE, usePortfolioParams } from "@/hooks/usePortfolioParams";
import { useMemo } from "react";
import { PortfolioFilterBar } from "./PortfolioFilterBar";
import { PortfolioList } from "./PortfolioList";
import { portfolioItems } from "@/libs/portfolio";
import { PortfolioPagination } from "./PortfolioPagination";

export const PortfolioExplorer = () => {
  const { params, setQuery, toggleTag, clearTags, toggleSort, setPage } =
    usePortfolioParams();
  const { tags, query, sort, page } = params;

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    return portfolioItems
      .filter((item) => {
        if (tags.size > 0 && !item.tags.some((t) => tags.has(t))) return false;
        if (q) {
          const searchable = [item.title, item.overview, ...item.tags]
            .join(" ")
            .toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        return sort === "newest" ? diff : -diff;
      });
  }, [query, tags, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredItems, currentPage],
  );
  const animationKey = useMemo(
    () => [query, sort, [...tags].sort().join(","), currentPage].join("|"),
    [query, sort, tags, currentPage],
  );
  return (
    <>
      <PortfolioFilterBar
        query={query}
        tags={tags}
        sort={sort}
        onQueryChange={setQuery}
        onToggleTag={toggleTag}
        onClearTags={clearTags}
        onSortToggle={toggleSort}
        className="sticky top-28 z-99"
      />
      <PortfolioList
        items={pagedItems}
        activeTags={tags}
        animationKey={animationKey}
      />
      <PortfolioPagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};
