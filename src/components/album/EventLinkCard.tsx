import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { LazyImage } from "../common/LazyImage";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { fetcher } from "@/utils/fetcher";
import { useEffect } from "react";
import useSWR from "swr";
import { Toast } from "../common/Toast";

type EventsContent = Record<"noImages" | "imagesLoadFailed", string>;

const getEventsContent = (language: LanguageOption): EventsContent =>
  ((
    {
      chinese: {
        noImages: "沒有圖片",
        imagesLoadFailed: "載入圖片失敗",
      },
      english: {
        noImages: "No Images",
        imagesLoadFailed: "Images Load Failed",
      },
    } as LanguageContent<EventsContent>
  )[language]);

export type EventLinkCardProps = DistributiveOmit<
  OverrideProps<
    React.ComponentPropsWithRef<typeof Link>,
    {
      year: string;
      eventName: string;
    }
  >,
  "href"
>;

export const EventLinkCard = ({
  year,
  eventName,
  ...rest
}: EventLinkCardProps) => {
  const {
    data: image,
    error,
    isLoading,
  } = useSWR<string>(
    `/api/album/${slugify(year)}/${slugify(eventName)}/0`,
    fetcher
  );

  const Language = useLanguage();
  const eventsContent = getEventsContent(Language.Current);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: eventsContent.imagesLoadFailed,
      });
    }
  }, [eventsContent.imagesLoadFailed, error]);

  return (
    <Link
      aria-label={`前往 ${eventName} 相簿`}
      className={`select-none rounded-lg relative overflow-hidden p-[1px] group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5`}
      href={`/album/${slugify(year)}/${slugify(eventName)}`}
      {...rest}
    >
      <LazyImage
        draggable={false}
        loading={isLoading}
        src={image}
        alt={eventName}
        className="aspect-square title bg-[#888] w-full object-cover transition duration-300 group-hover:brightness-50"
      />
      <span className="absolute w-full bg-[#000] opacity-50 bottom-0 hint font-bold text-center group-hover:opacity-100 transition-opacity">
        {eventName}
      </span>
    </Link>
  );
};
