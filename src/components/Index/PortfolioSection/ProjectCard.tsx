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
import "@/styles/project-card.css";
import { cn } from "@/utils/className";

export type ProjectCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ProjectItem;
  }
>;
export const ProjectCard = ({ className, item, ...rest }: ProjectCardProps) => {
  const Language = useLanguage();

  const infoUrl = `/projects/#${slugify(item.title.english)}`;
  const githubUrl = `https://github.com/${item.github?.repo}`;

  return (
    <div className={cn(`project-card`, className)} {...rest}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        draggable={false}
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
      />

      {/**資訊面板 */}
      <div className="overlay">
        <div className="relative flex flex-col justify-between w-full h-full p-6">
          {/* 主要內容區域 */}
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-extrabold leading-tight">
              {item.title[Language.Current]}
            </div>
            <div className="text-sm flex items-center gap-2 text-gray-300">
              <ClockCircleOutlined className="text-blue-400" />
              <span>{item.time}</span>
            </div>
            <div className="text-base text-gray-200 line-clamp-3">
              {item.about[Language.Current]}
            </div>
          </div>

          {/* 按鈕區域 */}
          <div className="text-lg md:text-xl flex justify-end gap-2">
            {[
              {
                tooltip: {
                  chinese: "Github 儲存庫",
                  english: "Github Repository",
                },
                icon: GithubOutlined,
                href: githubUrl,
                className: "btn-primary",
              },
              {
                tooltip: {
                  chinese: "詳細資訊",
                  english: "More Info",
                },
                icon: InfoCircleOutlined,
                href: infoUrl,
                className: "btn-secondary",
              },
            ].map((link) => (
              <Tooltip
                key={link.tooltip.english}
                title={link.tooltip[Language.Current]}
              >
                <CustomLink
                  className={`${link.className} p-3 rounded-full flex items-center justify-center`}
                  href={link.href}
                >
                  <link.icon />
                </CustomLink>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
