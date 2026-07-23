"use client";
import { PortfolioCard } from "./PortfolioCard";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioItem } from "@/types";

type PortfolioListProps = React.HTMLAttributes<HTMLElement> & {
  items: PortfolioItem[];
  animationKey: string;
};
export const PortfolioList = ({
  items,
  animationKey,
  ...rest
}: PortfolioListProps) => {
  return (
    <section {...rest}>
      <div className="container flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {items.length > 0 ? (
            <motion.div
              initial="hiddenLeft"
              animate="show"
              exit="hiddenRight"
              variants={staggerContainer}
              key={animationKey}
              className="w-full divide-y divide-(--foreground)/25"
            >
              {/* 列表 */}
              {items.map((item) => (
                <motion.article
                  key={item.title}
                  variants={fadeInItem}
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <PortfolioCard item={item} />
                </motion.article>
              ))}
            </motion.div>
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
