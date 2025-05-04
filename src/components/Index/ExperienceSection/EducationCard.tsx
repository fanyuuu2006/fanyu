import { useLanguage } from "@/context/LanguageContext";
import { degreeMap } from "@/lib/experience";
import { EducationItem } from "@/types/experience";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";
import Image from "next/image";

export interface EducationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: EducationItem;
}

export const EducationCard = ({
  item,
  className,
  ...rest
}: EducationCardProps) => {
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
        alt={item.school.english}
        className="h-30 w-fit bg-[#fff] rounded-full bordered"
        width={600}
        height={600}
      />
      <div className="card-glass flex flex-col flex-grow gap-1">
        <span className="content font-bold">
          {item.school[Language.Current]}
        </span>
        <OutsideLink
          href={item.href}
          className="hint opacity-75 w-fit flex gap-2"
        >
          <LinkOutlined />
          {item.href}
        </OutsideLink>
        <div className="flex flex-wrap gap-x-4 hint whitespace-nowrap opacity-75">
          <span className="flex gap-2">
            <ClockCircleOutlined />
            {`${item.duration.start ?? ""} ~ ${item.duration.end ?? ""}`}
          </span>
          <OutsideLink href={item.location.href} className="flex gap-2">
            <EnvironmentOutlined />
            {item.location[Language.Current]}
          </OutsideLink>
        </div>
        <span className="note font-bold">
          {item.department?.[Language.Current]}
        </span>
        <span>{degreeMap[Language.Current][item.degree]}</span>
      </div>
    </div>
  );
};
