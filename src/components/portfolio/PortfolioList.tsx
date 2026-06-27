"use client";
import { portfolioItems } from "@/libs/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { AnimatePresence, motion } from "framer-motion";
import { staggerContainer } from "@/libs/motion";
import { PortfolioFilterBar } from "./PortfolioFilterBar";
import { useMemo, useState } from "react";

export const PortfolioList = () => {
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filteredItems = useMemo(() => {
    let items = [...portfolioItems];

    if (tags.size > 0) {
      items = items.filter((item) => item.tags.some((tag) => tags.has(tag)));
    }
    if (query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.overview.toLowerCase().includes(lowerQuery),
      );
    }
    items.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
    return items;
  }, [tags, query, sortOrder]);

  return (
    <section>
      <div className="container">
        <PortfolioFilterBar
          tags={tags}
          setTags={setTags}
          setQuery={setQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${Array.from(tags).join(",")}-${query}-${sortOrder}`}
            initial="hiddenLeft"
            animate="show"
            exit="hiddenLeft"
            variants={staggerContainer}
            className="w-full divide-y divide-(--foreground)/25 py-8"
          >
            {filteredItems.map((item) => (
              <PortfolioCard key={item.title} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
