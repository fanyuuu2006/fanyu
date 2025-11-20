import { EventLinkCard } from "./EventLinkCard";
import { Collapse, OverrideProps } from "fanyucomponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Album } from "@/types/album";
import { cn } from "@/utils/className";

export type YearDivProps = OverrideProps<
  HTMLMotionProps<"article">,
  {
    item: Album[number];
  }
>;

type YearsContent = Record<"noEvents", string>;

const YEARS_CONTENT: LanguageContent<YearsContent> = {
  chinese: {
    noEvents: "沒有事件",
  },
  english: {
    noEvents: "No Events",
  },
};
export const YearDiv = ({ item, ...rest }: YearDivProps) => {
  const Language = useLanguage();
  const yearsContent = YEARS_CONTENT[Language.Current];
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);

  return (
    <motion.article
      id={item.year}
      className="w-full flex flex-col gap-4 mb-6"
      variants={fadeInItem}
      {...rest}
    >
      <div
        className={`flex items-center gap-2 transition-colors ${
          isCollapseOpen ? "" : "bg-[var(--background-color-primary)]"
        }`}
      >
        <h2 className="text-4xl font-semibold bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
          {item.year}
        </h2>
        <button
          className={cn(`text-3xl ml-auto transition-transform`, {
            "-rotate-90": isCollapseOpen,
          })}
          onClick={() => {
            setIsCollapseOpen((prev) => !prev);
          }}
        >
          <CaretLeftOutlined />
        </button>
      </div>
      <Collapse state={isCollapseOpen} className="w-full">
        <motion.div
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4"
        >
          {item.events.length === 0 ? (
            <div className="text-3xl font-bold">{`${item.year} - ${yearsContent.noEvents}`}</div>
          ) : (
            item.events.map((event) => (
              <motion.div
                variants={fadeInItem}
                key={`${item.year}-${event.name}`}
              >
                <EventLinkCard
                  year={item.year}
                  event={event}
                  className="w-full"
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </Collapse>
    </motion.article>
  );
};
