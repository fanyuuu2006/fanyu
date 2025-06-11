import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { EventLinkCard } from "./EventLinkCard";
import { Collapse, OverrideProps } from "fanyucomponents";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useEffect, useState } from "react";
import { Toast } from "../custom/Toast";
import { slugify } from "@/utils/url";
import { HTMLMotionProps, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { LazyImage } from "../custom/LazyImage";
import { CaretRightOutlined } from "@ant-design/icons";

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
  const {
    data: eventNames,
    error,
    isLoading,
  } = useSWR<string[]>(`/api/album/${slugify(year)}`, fetcher);

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

  const skeletonCount = eventNames?.length || 5;

  return (
    <motion.article id={year} className="w-full flex flex-col gap-2" {...rest}>
      <div
        className={`flex items-end gap-2 transition-colors ${
          isCollapseOpen ? "" : "bg-[var(--background-color-primary)]"
        }`}
      >
        <h2 className="label font-bold">{year}</h2>
        <button
          className={`content transition-transform ${
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
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full flex flex-wrap"
        >
          {isLoading ? (
            [...Array(skeletonCount)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                variants={fadeInItem}
                className="rounded-lg bg-[#888] border border-[var(--border-color)] aspect-square w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 animate-pulse"
              >
                <LazyImage loading={true} className="w-full" />
              </motion.div>
            ))
          ) : !eventNames || eventNames.length === 0 ? (
            <div className="content font-bold">{`${year} - ${yearsContent.noEvents}`}</div>
          ) : (
            eventNames.map((eventName) => (
              <motion.div
                variants={fadeInItem}
                key={`${year}-${eventName}`}
                className="rounded-lg overflow-hidden w-1/2 border border-[var(--border-color)] sm:w-1/3 md:w-1/4 lg:w-1/5"
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
