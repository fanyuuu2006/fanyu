import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Album } from "@/types/album";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/className";
import { MyImage } from "../custom/MyImage";

const EVENTLINKCARD_CONTENT = {
  chinese: {
    items: "個項目",
    altText: "相簿封面",
  },
  english: {
    items: "items",
    altText: "album cover",
  },
};

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
  const eventLinkCardContent = EVENTLINKCARD_CONTENT[language.Current];

  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Cover Item（安全版）
  const coverItem = event.items[0] as
    | Album[number]["events"][number]["items"][number]
    | undefined;

  const isVideo = coverItem?.mimeType?.startsWith("video/") ?? false;

  const imgWidth = coverItem?.imageMediaMetadata?.width || 800;
  const imgHeight = coverItem?.imageMediaMetadata?.height || 800;

  const href = `/album/${slugify(year)}/${slugify(event.name || "others")}`;

  return (
    <Link
      draggable={false}
      ref={ref}
      aria-label={`前往 ${year} ${event.name} 相簿`}
      className={cn("group", className)}
      href={href}
      {...rest}
    >
      <div className="w-full aspect-square bg-[#888] rounded-3xl overflow-hidden">
        <div className="relative w-full h-full group-hover:scale-125 transition-transform duration-300">
          {/* 縮圖預覽 */}
          <MyImage
            src={coverItem?.thumbnailLink}
            alt={eventLinkCardContent.altText}
            className="w-full h-full object-cover"
            width={imgWidth}
            height={imgHeight}
          />
          <MyImage
            src={isVideo ? coverItem?.thumbnailLink : coverItem?.url}
            fallbackSrc={coverItem?.thumbnailLink}
            alt={eventLinkCardContent.altText}
            width={imgWidth}
            height={imgHeight}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
              { "opacity-0": !isInView }
            )}
          />
        </div>
      </div>

      <div className="text-base flex flex-col px-1 py-3">
        <span className="font-semibold leading-tight">{event.name}</span>
        <span className="text-[var(--text-color-muted)] leading-relaxed">
          {event.items.length} {eventLinkCardContent.items}
        </span>
      </div>
    </Link>
  );
};
