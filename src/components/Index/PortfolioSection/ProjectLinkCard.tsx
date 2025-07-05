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
  border: 2px solid #ccc;
  aspect-ratio: 1 / 1;
  border-radius: 1.5rem;
  overflow: hidden;
`;
const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  background: #fff;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: all 0.3s ease-in-out;
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
      <Overlay className="relative flex flex-col w-full h-full p-4">
        <div className="text-2xl font-bold">{item.title[Language.Current]}</div>
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
      </Overlay>
    </ProjectCardWrapper>
  );
};
