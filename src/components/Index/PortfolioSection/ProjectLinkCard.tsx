import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectItem } from "@/types/portfolio";
import { slugify } from "@/utils/url";
import {
  ClockCircleOutlined,
  GithubOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import React from "react";
import { Tooltip } from "antd";
import { CustomLink } from "@/components/custom/CustomLink";

export type ProjectLinkCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ProjectItem;
  }
>;

/**
 * 專案連結卡片組件 - 展示專案的連結和相關資訊
 * @param item - 專案項目資料
 * @param rest - 其他 HTML div 屬性
 */
export const ProjectLinkCard = ({
  item,
  className,
  ...rest
}: ProjectLinkCardProps) => {
  const Language = useLanguage();

  const infoUrl = `/projects/#${slugify(item.title.english)}`;
  const githubUrl = `https://github.com/${item.github?.repo}`;

  return (
    <div
      className={`group card aspect-square bg-white overflow-hidden ${className}`}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full h-full object-cover"
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
      />

      {/**Hover 資訊面板 */}
      <div className="absolute inset-0 bg-[#00000088] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative flex flex-col w-full h-full p-4">
          <div className="text-2xl font-bold">
            {item.title[Language.Current]}
          </div>
          <div className="text-base flex gap-2">
            <ClockCircleOutlined />
            {item.time}
          </div>
          <div className="text-lg">{item.about[Language.Current]}</div>
          <div className="absolute bottom-4 right-4 text-2xl flex gap-2">
            {[
              {
                tooltip: {
                  chinese: "Github 儲存庫",
                  english: "Github Repository",
                },
                icon: GithubOutlined,
                href: githubUrl,
              },
              {
                tooltip: {
                  chinese: "詳細資訊",
                  english: "More Info",
                },
                icon: InfoCircleOutlined,
                href: infoUrl,
              },
            ].map((link) => (
              <CustomLink
                key={link.tooltip.english}
                className="btn-primary p-2 rounded-full flex gap-2"
                href={link.href}
              >
                <Tooltip title={link.tooltip[Language.Current]}>
                  <link.icon />
                </Tooltip>
              </CustomLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
