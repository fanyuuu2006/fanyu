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
      <div className="container">
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key={listKey}
              initial="hiddenLeft"
              animate="show"
              exit="hiddenLeft"
              variants={staggerContainer}
            >
              {/* 數量 */}
              <p className="mt-4 mb-2 text-sm text-(--muted) text-center">
                共 {filteredItems.length} 個專案
              </p>

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
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-(--muted)"
            >
              <p>沒有符合條件的專案</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
