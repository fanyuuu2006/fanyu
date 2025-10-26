import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Album } from "@/types/album";
import { FALLBACK_IMAGE } from "@/libs/album";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

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

  return (
    <Link
      draggable={false}
      ref={ref}
      aria-label={`前往 ${year} ${event.name} 相簿`}
      className={`relative group ${className}`}
      href={`/album/${slugify(year)}/${slugify(event.name)}`}
      {...rest}
    >
      <div className="rounded-3xl overflow-hidden">
        <Image
          src={
            isInView
              ? event.images[0].url
              : event.images[0].thumbnailLink || FALLBACK_IMAGE
          }
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          alt={`${year} ${event.name} 相簿封面`}
          className="w-full h-full aspect-square bg-[#888] object-cover transition-all duration-300 group-hover:scale-125"
          width={event.images[0].imageMediaMetadata?.width}
          height={event.images[0].imageMediaMetadata?.height}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzg4OCIvPjwvc3ZnPg=="
        />
      </div>
      <div className="text-base flex flex-col px-1 py-3">
        <span className="font-semibold leading-tight">{event.name}</span>
        <span className="text-[var(--text-color-muted)] leading-relaxed">
          {event.images.length}{" "}
          {
            {
              chinese: "張照片",
              english: "images",
            }[language.Current]
          }
        </span>
      </div>
    </Link>
  );
};
