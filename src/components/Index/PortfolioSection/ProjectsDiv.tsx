import { profile } from "@/libs/profile";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import styled from "styled-components";

export const Carousel = styled.div`
  max-width: 100%;
  mask-image: linear-gradient(
    to right,
    transparent,
    var(--background-color-dark) 5% 95%,
    transparent
  );
`;

export const Container = styled.div`
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  animation: slide 15s linear infinite;

  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

export const Chunk = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const Item = styled.div`
  width: 288px;
  margin: 0.5rem;
  transition: all 0.3s ease-in-out;

  ${Container}:hover & {
    filter: grayscale(1);
  }

  &:hover {
    filter: grayscale(0) !important;
  }
`;

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

  return (
    <div
      className={`flex flex-col p-2 gap-4 items-center max-w-full overflow-hidden ${className}`}
      {...rest}
    >
      <div className="w-full label font-bold">
        <span>{projectsContent.projects}</span>
      </div>

      {/* 輪播區塊 */}
      <Carousel>
        <Container>
          {[0, 1].map((chunk) => (
            <Chunk key={chunk}>
              {profile.portfolio.projects
                .sort(
                  (a, b) =>
                    new Date(a.time).getTime() - new Date(b.time).getTime()
                )
                .map((item) => (
                  <Item
                    key={`${item.title.english}-${chunk}`}
                    aria-hidden={chunk ? "true" : undefined}
                  >
                    <ProjectLinkCard item={item} />
                  </Item>
                ))}
            </Chunk>
          ))}
        </Container>
      </Carousel>

      {/**了解更多 */}
      <Link
        className="note flex transition-all hover:-translate-x-2 group"
        href="/projects"
      >
        {projectsContent.learnMore}
        <ArrowRightOutlined className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-2" />
      </Link>
    </div>
  );
};
