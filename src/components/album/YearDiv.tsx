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
      className="w-full flex flex-col gap-6 mb-12"
      variants={fadeInItem}
      {...rest}
    >
      <div
        className="flex items-center gap-4 cursor-pointer group select-none"
        onClick={() => setIsCollapseOpen((prev) => !prev)}
      >
        <h2 className="text-4xl font-bold tracking-tight">
          <span className="bg-linear-to-br from-(--text-color-primary) to-(--text-color-secondary) bg-clip-text text-transparent">
            {item.year}
          </span>
        </h2>
        <div className="h-px flex-1 bg-(--border-color)/50 group-hover:bg-(--border-color) transition-colors" />
        <button
          className={cn(
            `text-2xl p-2 rounded-full transition-all duration-300 text-(--text-color-muted) group-hover:text-(--text-color-primary)`,
            {
              "-rotate-90": isCollapseOpen,
            }
          )}
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
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-8"
        >
          {item.events.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-(--text-color-muted) bg-(--background-color-secondary)/20 rounded-2xl border border-(--border-color)/50 border-dashed">
              <span className="text-lg italic">{yearsContent.noEvents}</span>
            </div>
          ) : (
            item.events.map((event, index) => (
              <motion.div
                variants={fadeInItem}
                key={`${item.year}-${event.name || event.id || index}`}
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
