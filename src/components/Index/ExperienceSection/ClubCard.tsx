import { useLanguage } from "@/context/LanguageContext";
import { ClubItem } from "@/types/experience";
import { ClockCircleOutlined, InstagramOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import Image from "next/image";

export type ClubCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ClubItem;
  }
>;

export const ClubCard = ({ item, className, ...rest }: ClubCardProps) => {
  const Language = useLanguage();
  return (
    <div
      className={`${
        className ?? ""
      } card bordered w-full p-4 gap-4 flex flex-wrap items-center md:flex-nowrap`}
      {...rest}
    >
      <Image
        src={item.imageSrc}
        alt={item.name.english}
        className="h-30 w-fit bg-[#fff] rounded-full bordered"
        width={600}
        height={600}
      />
      <div className="card-glass flex flex-col flex-grow gap-1">
        <span className="content font-bold">{item.name[Language.Current]}</span>
        {item.organization && (
          <span className="note font-bold opacity-75">
            {item.organization.name[Language.Current]}
          </span>
        )}
        <div className="flex flex-col hint opacity-75 ">
          <span className="flex gap-2">
            <ClockCircleOutlined />
            {`${item.duration.start ?? ""} ~ ${item.duration.end ?? ""}`}
          </span>
          <OutsideLink href={item.href} className="w-fit flex gap-2">
            <InstagramOutlined />
            {item.href}
          </OutsideLink>
        </div>
        <span>{item.role[Language.Current]}</span>
      </div>
    </div>
  );
};
