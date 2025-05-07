import { slugify } from "@/utils/url";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
export type EventLinkCardProps = DistributiveOmit<
  OverrideProps<
    React.ComponentPropsWithRef<typeof Link>,
    {
      eventName: string;
      items: string[];
    }
  >,
  "href"
>;

export const EventLinkCard = ({
  eventName,
  items,
  ...rest
}: EventLinkCardProps) => {
  return (
    <Link
      aria-label={`前往 ${eventName} 相簿`}
      className="select-none bordered relative overflow-hidden group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
      href={`/album/${slugify(eventName)}`}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        draggable={false}
        loading="lazy"
        src={items[0]}
        alt={eventName}
        className="aspect-square w-full h-full object-cover transition duration-300 group-hover:brightness-50"
      />
      <span className="absolute w-full bg-[#000] opacity-50 bottom-0 hint font-bold text-center group-hover:opacity-100 transition-opacity">
        {eventName}
      </span>
    </Link>
  );
};
