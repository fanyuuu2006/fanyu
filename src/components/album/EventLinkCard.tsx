import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { LazyImage } from "../common/LazyImage";

export type EventLinkCardProps = DistributiveOmit<
  OverrideProps<
    React.ComponentPropsWithRef<typeof Link>,
    {
      year: string;
      eventName: string;
      imageSrcs: string[];
    }
  >,
  "href"
>;

export const EventLinkCard = ({
  year,
  eventName,
  imageSrcs,
  ...rest
}: EventLinkCardProps) => {
  return (
    <Link
      aria-label={`前往 ${eventName} 相簿`}
      className="select-none relative overflow-hidden bg-[#888] p-[1px] group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
      href={`/album/${slugify(year)}/${slugify(eventName)}`}
      {...rest}
    >
      <LazyImage
        src={imageSrcs[0]}
        alt={eventName}
        className="aspect-square title w-full object-cover transition duration-300 group-hover:brightness-50"
      />
      <span className="absolute w-full bg-[#000] opacity-50 bottom-0 hint font-bold text-center group-hover:opacity-100 transition-opacity">
        {eventName}
      </span>
    </Link>
  );
};
