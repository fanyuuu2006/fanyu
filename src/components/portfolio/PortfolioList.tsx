"use client";
import { portfolioItems } from "@/libs/portfolio";
import { usePortfolioParams } from "@/hooks/usePortfolioParams";
import { PortfolioCard } from "./PortfolioCard";
import { staggerContainer } from "@/libs/motion";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export const PortfolioList = () => {
  const { params } = usePortfolioParams();
  const { tags, query, sort } = params;

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    return portfolioItems
      .filter((item) => {
        if (tags.size > 0 && !item.tags.some((t) => tags.has(t))) return false;
        if (q && !item.title.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        return sort === "newest" ? diff : -diff;
      });
  }, [tags, query, sort]);

  const listKey = useMemo(
    () => [...tags].sort().join(",") + query + sort,
    [tags, query, sort],
  );

  return (
    <section>
      <div className="container flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 text-sm items-center justify-between">
                <p className="text-(--foreground)">
                  目前顯示 {filteredItems.length} 個專案
                </p>
                <p className="text-(--muted)">
                  {tags.size > 0
                    ? `已套用 ${tags.size} 個標籤條件`
                    : "尚未套用標籤條件"}
                </p>
              </div>

              <motion.div
                key={listKey}
                initial="hiddenLeft"
                animate="show"
                exit="hiddenLeft"
                variants={staggerContainer}
              >
                {/* 列表 */}
                <div className="w-full divide-y divide-(--foreground)/25">
                  {filteredItems.map((item) => (
                    <PortfolioCard
                      key={item.title}
                      item={item}
                      activeTags={tags}
                    />
                  ))}
                </div>
              </motion.div>
              {/* 回到頂部 */}
              <div className="flex justify-center py-8">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="flex items-center gap-1.5 text-sm text-(--muted) hover:text-(--foreground) transition-colors duration-300"
                  aria-label="回到頂部"
                >
                  <VerticalAlignTopOutlined aria-hidden />
                  <span>回到頂部</span>
                </button>
              </div>
            </>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center"
            >
              <div className="mx-auto max-w-md rounded-2xl border border-(--border)/60 bg-(--secondary-background)/50 px-6 py-8 text-(--muted)">
                <p className="text-base font-medium text-(--foreground)">
                  沒有符合條件的專案
                </p>
                <p className="mt-2 text-sm leading-7">
                  試著清除部分標籤，或改用其他關鍵字重新搜尋。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
