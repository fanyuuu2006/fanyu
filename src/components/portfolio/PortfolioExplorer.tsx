"use client";
import { PAGE_SIZE, usePortfolioParams } from "@/hooks/usePortfolioParams";
import { useMemo } from "react";
import { PortfolioFilterBar } from "./PortfolioFilterBar";
import { PortfolioList } from "./PortfolioList";
import { portfolioItems } from "@/libs/portfolio";
import { PortfolioPagination } from "./PortfolioPagination";

export const PortfolioExplorer = () => {
  const { params, setQuery, toggleSort, setPage } = usePortfolioParams();
  const { query, sort, page } = params;

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    return portfolioItems
      .filter((item) => {
        if (q) {
          const searchable = [
            item.title,
            item.overview,
            item.date,
            ...item.tags,
          ]
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
  }, [query, sort]);

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
    () => [query, sort, currentPage].join("|"),
    [query, sort, currentPage],
  );
  return (
    <>
      <PortfolioFilterBar
        query={query}
        sort={sort}
        onQueryChange={setQuery}
        onSortToggle={toggleSort}
        className="sticky top-20 z-99"
      />
      <PortfolioList
        items={pagedItems}
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
