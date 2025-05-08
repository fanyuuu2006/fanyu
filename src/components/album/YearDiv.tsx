import { LoadingOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { EventLinkCard } from "./EventLinkCard";
import { OverrideProps } from "fanyucomponents";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useEffect } from "react";
import { Toast } from "../common/Toast";
import { slugify } from "@/utils/url";

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
    data: eventNamess,
    error,
    isLoading,
  } = useSWR<string[]>(`/api/album/${slugify(year)}`, fetcher);

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
    <div className="w-full flex flex-col gap-2" {...rest}>
      <div className="label font-bold">{year}</div>
      <div className="w-full flex flex-wrap">
        {isLoading ? (
          <LoadingOutlined className="title" />
        ) : !eventNamess || eventNamess.length === 0 ? (
          <div className="content font-bold">{`${year} - ${yearsContent.noEvents}`}</div>
        ) : (
          eventNamess.map((eventName) => (
            <EventLinkCard key={eventName} year={year} eventName={eventName} />
          ))
        )}
      </div>
    </div>
  );
};
