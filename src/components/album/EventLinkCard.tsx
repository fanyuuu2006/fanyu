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
    <Link className="card bordered w-64 relative overflow-hidden group" href={slugify(`/album/${eventName}`)} {...rest}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={items[0]}
        alt={eventName}
        className="aspect-square w-full h-full object-cover transition duration-300 group-hover:brightness-50"
      />
      <span className="absolute inset-0 flex items-center justify-center note font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        {eventName}
      </span>
    </Link>
  );
};
