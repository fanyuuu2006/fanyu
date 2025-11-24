import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { Album } from "@/types/album";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/className";
import { MyImage } from "../custom/MyImage";

export type EventLinkCardProps = DistributiveOmit<
  OverrideProps<
    React.ComponentPropsWithRef<typeof Link>,
    {
      event: Album[number]["events"][number];
      year: Album[number]["year"];
    }
  >,
  "href"
>;

export const EventLinkCard = ({
  year,
  event,
  className = "",
  ...rest
}: EventLinkCardProps) => {
  const language = useLanguage();

  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });
  const coverItem = useMemo(() => event.items[0], [event.items]);
  const isVideo = coverItem.mimeType?.startsWith("video/");

  return (
    <Link
      draggable={false}
      ref={ref}
      aria-label={`前往 ${year} ${event.name} 相簿`}
      className={cn("group", className)}
      href={`/album/${slugify(year)}/${slugify(event.name || "其他")}`}
      {...rest}
    >
      <div className="rounded-3xl overflow-hidden">
        <MyImage
          src={isInView && !isVideo ? coverItem.url : coverItem.thumbnailLink}
          fallbackSrc={coverItem.thumbnailLink}
          alt={`${year} ${event.name} 相簿封面`}
          className="w-full h-full aspect-square bg-[#888] object-cover transition-all duration-300 group-hover:scale-125"
          width={coverItem.imageMediaMetadata?.width || 800}
          height={coverItem.imageMediaMetadata?.height || 800}
        />
      </div>
      <div className="text-base flex flex-col px-1 py-3">
        <span className="font-semibold leading-tight">{event.name}</span>
        <span className="text-[var(--text-color-muted)] leading-relaxed">
          {event.items.length}{" "}
          {
            {
              chinese: "張照片",
              english: "items",
            }[language.Current]
          }
        </span>
      </div>
    </Link>
  );
};
