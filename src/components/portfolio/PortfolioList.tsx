"use client";
import { portfolioItems } from "@/libs/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { AnimatePresence, motion } from "framer-motion";
import { staggerContainer } from "@/libs/motion";

export const PortfolioList = () => {
  return (
    <section>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            initial="hiddenLeft"
            animate="show"
            exit="hiddenLeft"
            variants={staggerContainer}
            className="w-full divide-y divide-(--foreground)/25 py-8"
          >
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.title} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
