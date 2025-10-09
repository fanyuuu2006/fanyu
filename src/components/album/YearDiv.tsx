import { EventLinkCard } from "./EventLinkCard";
import { Collapse, OverrideProps } from "fanyucomponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { CaretRightOutlined } from "@ant-design/icons";
import { Album } from "@/types/album";

export type YearDivProps = OverrideProps<
  HTMLMotionProps<"article">,
  {
    item: Album[number];
  }
>;

type YearsContent = Record<"noEvents", string>;

const getYearsContent = (language: LanguageOption): YearsContent =>
  ((
    {
      chinese: {
        noEvents: "沒有事件",
      },
      english: {
        noEvents: "No Events",
      },
    } as LanguageContent<YearsContent>
  )[language]);

export const YearDiv = ({ item, ...rest }: YearDivProps) => {
  const Language = useLanguage();
  const yearsContent = getYearsContent(Language.Current);
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);

  return (
    <motion.article
      id={item.year}
      className="w-full flex flex-col mb-8 gap-2"
      variants={fadeInItem}
      {...rest}
    >
      {/* 年份 */}
      <div
        className={`flex items-center gap-2 transition-colors ${
          isCollapseOpen ? "" : "bg-[var(--background-color-primary)]"
        }`}
      >
        <h2 className="text-4xl font-bold">{item.year}</h2>
        <button
          className={`text-3xl transition-transform ${
            isCollapseOpen ? "rotate-90" : ""
          }`}
          onClick={() => {
            setIsCollapseOpen((prev) => !prev);
          }}
          aria-label={isCollapseOpen ? `收合 ${item.year} 年相簿` : `展開 ${item.year} 年相簿`}
        >
          <CaretRightOutlined />
        </button>
      </div>
      <Collapse state={isCollapseOpen} className="w-full">
        <motion.div
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[1px]"
        >
          {item.events.length === 0 ? (
            <div className="text-3xl font-bold">{`${item.year} - ${yearsContent.noEvents}`}</div>
          ) : (
            item.events.map((event) => (
              <motion.div
                variants={fadeInItem}
                key={`${item.year}-${event.name}`}
                className="rounded-md overflow-hidden border border-[var(--border-color)]"
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
