import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { LazyImage } from "../custom/LazyImage";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { Toast } from "../custom/Toast";
import { useInView } from "framer-motion";

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
  className = "",
  eventName,
  ...rest
}: EventLinkCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });
  const { data: image, error } = useSWR<string>(
    isInView ? `/api/album/${slugify(year)}/${slugify(eventName)}/0` : null,
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
      draggable={true}
      ref={ref}
      aria-label={`前往 ${eventName} 相簿`}
      className={`relative group ${className}`}
      href={`/album/${slugify(year)}/${slugify(eventName)}`}
      {...rest}
    >
      <LazyImage
        draggable={false}
        loading={!isInView}
        src={image}
        alt={eventName}
        className="aspect-square title bg-[#888] object-cover transition duration-300 group-hover:brightness-50 group-hover:scale-125"
      />
      <div className="absolute w-full px-4 py-2 bg-[#000] flex justify-center opacity-50 bottom-0 group-hover:opacity-100 transition-opacity">
        <span className="hint font-bold">{eventName}</span>
      </div>
    </Link>
  );
};
