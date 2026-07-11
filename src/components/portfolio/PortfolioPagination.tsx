"use client";

import { useState } from "react";
import { cn } from "@/utils/className";

type PortfolioPaginationProps = React.HTMLAttributes<HTMLElement> & {
  page: number;
  totalPages: number;
  onPageChange(page: number): void;
};

export const PortfolioPagination = ({
  page,
  totalPages,
  onPageChange,
  className,
  ...props
}: PortfolioPaginationProps) => {
  const [inputValue, setInputValue] = useState(`${page}`);
  const [syncedPage, setSyncedPage] = useState(page);

  // 只有當外部 page 真的改變時才同步，跟 inputValue 目前打了什麼無關
  if (page !== syncedPage) {
    setSyncedPage(page);
    setInputValue(`${page}`);
  }

  if (totalPages <= 1) return null;

  const goToPrevious = () => page > 1 && onPageChange(page - 1);
  const goToNext = () => page < totalPages && onPageChange(page + 1);

  const commitInput = () => {
    const next = parseInt(inputValue, 10);

    if (Number.isInteger(next)) {
      const clamped = Math.min(Math.max(next, 1), totalPages);
      setInputValue(`${clamped}`);
      if (clamped !== page) onPageChange(clamped);
    } else {
      setInputValue(`${page}`);
    }
  };

  return (
    <nav
      aria-label="分頁導覽"
      className={cn(
        "container flex items-center justify-center gap-3",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        className="btn rounded-xl px-4 py-2"
        disabled={page === 1}
        onClick={goToPrevious}
      >
        上一頁
      </button>

      <div className="flex items-center gap-2 text-sm">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="page"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={commitInput}
          onKeyDown={(e) => e.key === "Enter" && commitInput()}
          aria-label={`目前頁碼，共 ${totalPages} 頁`}
          className="h-10 w-14 rounded-xl border border-(--border) bg-(--secondary-background)/50 text-center outline-none"
        />
        <span className="text-(--muted)">/</span>
        <span className="text-(--muted)"> {totalPages}</span>
      </div>

      <button
        type="button"
        className="btn rounded-xl px-4 py-2"
        disabled={page === totalPages}
        onClick={goToNext}
      >
        下一頁
      </button>
    </nav>
  );
};
