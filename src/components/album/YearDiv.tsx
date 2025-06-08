import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { EventLinkCard } from "./EventLinkCard";
import { OverrideProps } from "fanyucomponents";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useEffect } from "react";
import { Toast } from "../custom/Toast";
import { slugify } from "@/utils/url";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";

export type YearDivProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
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
  } = useSWR<string[]>(`/api/album/${slugify(year)}`, fetcher, {
    fallbackData: ["其他"],
  });

  const Language = useLanguage();
  const yearsContent = getYearsContent(Language.Current);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: yearsContent.eventsLoadFailed,
      });
    }
  }, [yearsContent.eventsLoadFailed, error]);

  return (
    <div id={year} className="w-full flex flex-col gap-2" {...rest}>
      <div className="label font-bold">{year}</div>
      <motion.div
        key={`${isLoading}`}
        variants={staggerContainer}
        initial="hiddenBottom"
        animate="show"
        viewport={{ once: true, amount: 0.5 }}
        className="w-full flex flex-wrap"
      >
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={fadeInItem}
              className="rounded-lg bg-[#888] border border-black aspect-square w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 animate-pulse"
            />
          ))
        ) : !eventNames || eventNames.length === 0 ? (
          <div className="content font-bold">{`${year} - ${yearsContent.noEvents}`}</div>
        ) : (
          eventNames.map((eventName) => (
            <motion.div
              variants={fadeInItem}
              key={eventName}
              className="rounded-lg overflow-hidden w-1/2 border border-black sm:w-1/3 md:w-1/4 lg:w-1/5"
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
    </div>
  );
};
