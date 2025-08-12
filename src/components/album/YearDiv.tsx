import { Toast } from "../custom/Toast";
import { EventLinkCard } from "./EventLinkCard";
import { Collapse, OverrideProps } from "fanyucomponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useEffect, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { CaretRightOutlined } from "@ant-design/icons";
import { useAlbum } from "@/contexts/AlbumContext";

export type YearDivProps = OverrideProps<
  HTMLMotionProps<"article">,
  { year: string }
>;

type YearsContent = Record<"noEvents" | "eventsLoadFailed", string>;

const getYearsContent = (language: LanguageOption): YearsContent =>
  ((
    {
      chinese: {
        noEvents: "沒有事件",
        eventsLoadFailed: "載入事件失敗",
      },
      english: {
        noEvents: "No Events",
        eventsLoadFailed: "Events Load Failed",
      },
    } as LanguageContent<YearsContent>
  )[language]);

export const YearDiv = ({ year, ...rest }: YearDivProps) => {
  const { useEvents } = useAlbum();
  const { data: eventNames, error, isLoading } = useEvents(year);

  const Language = useLanguage();
  const yearsContent = getYearsContent(Language.Current);
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: yearsContent.eventsLoadFailed,
      });
    }
  }, [yearsContent.eventsLoadFailed, error]);

  const skeletonCount = eventNames?.length || 6;

  return (
    <motion.article id={year} className="w-full flex flex-col gap-2" {...rest}>
      <div
        className={`flex items-center gap-2 transition-colors ${
          isCollapseOpen ? "" : "bg-[var(--background-color-primary)]"
        }`}
      >
        <h2 className="text-4xl font-bold">{year}</h2>
        <button
          className={`text-3xl transition-transform ${
            isCollapseOpen ? "rotate-90" : ""
          }`}
          onClick={() => {
            setIsCollapseOpen((prev) => !prev);
          }}
        >
          <CaretRightOutlined />
        </button>
      </div>
      <Collapse state={isCollapseOpen} className="w-full">
        <motion.div
          key={isLoading.toString()}
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[1px]"
        >
          {isLoading ? (
            [...Array(skeletonCount)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                variants={fadeInItem}
                className="rounded-lg bg-[#888] border border-[var(--border-color)] aspect-square animate-pulse"
              ></motion.div>
            ))
          ) : !eventNames || eventNames.length === 0 ? (
            <div className="text-3xl font-bold">{`${year} - ${yearsContent.noEvents}`}</div>
          ) : (
            eventNames.map((eventName) => (
              <motion.div
                variants={fadeInItem}
                key={`${year}-${eventName}`}
                className="rounded-lg overflow-hidden border border-[var(--border-color)]"
              >
                <EventLinkCard
                  year={year}
                  eventName={eventName}
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
