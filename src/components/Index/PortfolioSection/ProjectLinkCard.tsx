import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { OverrideProps } from "fanyucomponents";
import React from "react";
import styled from "styled-components";

const ProjectCardWrapper = styled.div`
  position: relative;
  border: 2px solid #ccc;
  aspect-ratio: 1 / 1;
  border-radius: 0.75rem;
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
  background: rgba(0, 0, 0, 0.5);
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

  return (
    <ProjectCardWrapper {...rest}>
      <ProjectImage
        draggable={false}
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
      />

      {/**Hover 資訊面板 */}
      <Overlay className="relative flex flex-col justify-center w-full h-full p-4">
        <div className="content font-bold">{item.title[Language.Current]}</div>
        <div className="hint flex gap-2">
          <ClockCircleOutlined />
          {item.time}
        </div>
        <div className="note">{item.about[Language.Current]}</div>
        <Link
          className="absolute bottom-4 right-4 note flex gap-2"
          href={`/projects/#${slugify(item.title.english)}`}
          aria-label={`View project: ${item.title.english}`}
        >
          {
            {
              chinese: "詳細資訊",
              english: "More Info",
            }[Language.Current]
          }
          <ArrowRightOutlined />
        </Link>
      </Overlay>
    </ProjectCardWrapper>
  );
};
