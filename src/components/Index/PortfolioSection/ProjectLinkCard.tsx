import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { OverrideProps } from "fanyucomponents";
import React from "react";

export type ProjectLinkCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ProjectItem;
  }
>;
export const ProjectLinkCard = ({
  item,
  className = "",
  ...rest
}: ProjectLinkCardProps) => {
  const Language = useLanguage();

  return (
    <div
      className={`${className} border-[1px] border-[#ccc] group relative aspect-square rounded-xl overflow-hidden`}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        draggable={false}
        className="brightness-75 w-full h-full bg-white object-cover"
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
      />

      {/**Hover 資訊面板 */}
      <div className="absolute inset-0 opacity-0 bg-[#00000066] transition-all duration-300 ease-in-out group-hover:opacity-100">
        <div className="relative flex flex-col justify-center w-full h-full p-4">
          <div className="content font-bold">{item.title[Language.Current]}</div>
          <div className="hint flex gap-2">
            <ClockCircleOutlined />
            {item.time}
          </div>
          <div className="note">
            {item.about[Language.Current]}
          </div>
          <Link
            className="absolute bottom-4 right-4 note flex gap-2"
            href={`/projects/#${slugify(item.title.english)}`}
            aria-label={`View project: ${item.title.english}`}
          >
            {
              {
                chinese: "前往",
                english: "Go to",
              }[Language.Current]
            }
            <ArrowRightOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
};
