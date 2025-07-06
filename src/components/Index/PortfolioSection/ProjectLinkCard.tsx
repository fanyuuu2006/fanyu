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
import styled from "styled-components";
import { Tooltip } from "antd";
import { CustomLink } from "@/components/custom/CustomLink";

const ProjectCardWrapper = styled.div`
  position: relative;
  border: 2px solid var(--border-color);
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal) ease;
  box-shadow: var(--shadow-base);
  background: var(--background-color-secondary);

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--border-color-light);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  background: #fff;
  object-fit: cover;
  transition: transform var(--transition-slow) ease;

  ${ProjectCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.85) 100%
  );
  opacity: 0;
  backdrop-filter: blur(2px);
  transition: all var(--transition-normal) ease;
  color: var(--text-color);

  ${ProjectCardWrapper}:hover & {
    opacity: 1;
  }
`;

export type ProjectLinkCardProps = OverrideProps<
  React.ComponentPropsWithRef<typeof ProjectCardWrapper>,
  {
    item: ProjectItem;
  }
>;
export const ProjectLinkCard = ({ item, ...rest }: ProjectLinkCardProps) => {
  const Language = useLanguage();

  const infoUrl = `/projects/#${slugify(item.title.english)}`;
  const githubUrl = `https://github.com/${item.github?.repo}`;

  return (
    <ProjectCardWrapper {...rest}>
      <ProjectImage
        draggable={false}
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
      />

      {/**Hover 資訊面板 */}
      <Overlay>
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
      </Overlay>
    </ProjectCardWrapper>
  );
};
