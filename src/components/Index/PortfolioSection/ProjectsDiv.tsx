import { profile } from "@/libs/profile";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import styled from "styled-components";

type ProjectsContent = Record<"projects" | "learnMore" | "refresh", string>;

const getProjectsContent = (language: LanguageOption): ProjectsContent =>
  ((
    {
      chinese: {
        projects: "專案",
        learnMore: "了解更多",
        refresh: "換一批",
      },
      english: {
        projects: "Projects",
        learnMore: "Learn more",
        refresh: "Refresh",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export type ProjectsDivProps = React.HTMLAttributes<HTMLDivElement>;
export const ProjectsDiv = ({ className = "", ...rest }: ProjectsDivProps) => {
  const Language = useLanguage();
  const projectsContent = getProjectsContent(Language.Current);

  const projects = profile.portfolio.projects;

  return (
    <div
      className={`flex flex-col p-2 gap-4 items-center max-w-full overflow-hidden ${className}`}
      {...rest}
    >
      <div className="label font-bold">{projectsContent.projects}</div>

      {/* 輪播區塊 */}
      <CarouselWrapper className="w-full">
        <div className="carousel">
          <div className="inner">
            {[...Array(2)].map((_, chunk) => (
              <div key={chunk} className="chunk">
                {projects.map((item) => (
                  <ProjectLinkCard
                    key={`${item.title.english}-${chunk}`}
                    item={item}
                    className="item w-80 m-1"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CarouselWrapper>

      {/**了解更多 */}
      <Link
        className="note flex transition-all hover:-translate-x-2 chunk"
        href="/projects"
      >
        {projectsContent.learnMore}
        <ArrowRightOutlined className="opacity-0 transition-all chunk-hover:opacity-100 chunk-hover:translate-x-2" />
      </Link>
    </div>
  );
};

const CarouselWrapper = styled.div`
  .carousel {
    max-width: 100%;
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 5% 95%,
      transparent
    );
  }
  .carousel .inner {
    width: max-content;
    display: flex;
    flex-wrap: nowrap;
    animation: slide 15s linear infinite;
  }

  .carousel .inner .chunk {
    display: flex;
    flex-wrap: nowrap;
  }
  .carousel .inner .chunk .item{
    transition: all 0.3s ease-in-out;
  }

  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .carousel .inner:hover {
    animation-play-state: paused;
  }
  .carousel .inner:hover .item {
    animation-play-state: paused;
    filter: grayscale(1);
  }
  .carousel .inner .item:hover {
    filter: grayscale(0);
  }
`;
