import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Album } from "@/types/album";
import { FALLBACK_IMAGE } from "@/libs/album";

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
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={isInView ? event.images[0] : FALLBACK_IMAGE}
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
        }}
        alt={`${year} ${event.name} 相簿封面`}
        className="aspect-square bg-[#888] object-cover transition-all duration-300 group-hover:brightness-50 group-hover:scale-125"
      />
      <div className="absolute w-full px-2 py-1.5 bg-[#000] flex justify-center opacity-50 bottom-0 group-hover:opacity-100  transition-all duration-300">
        <span className="text-sm font-bold">{event.name}</span>
      </div>
    </Link>
  );
};
