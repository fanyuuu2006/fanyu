import { profile } from "@/libs/profile";
import { ProjectItem } from "@/types/portfolio";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { useMemo, useRef, useState } from "react";

const visibleCount = 3;

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
        learnMore: "Learn More",
        refresh: "Refresh",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export type ProjectsDivProps = React.HTMLAttributes<HTMLDivElement>;

export const ProjectsDiv = ({ className = "", ...rest }: ProjectsDivProps) => {
  const Language = useLanguage();
  const projectsContent = getProjectsContent(Language.Current);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const total = profile.portfolio.projects.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPage = useMemo(() => {
    return (index: number) => {
      if (!containerRef.current) return;
      containerRef.current.scrollTo({
        left: index * (containerRef.current.clientWidth / visibleCount),
        behavior: "smooth",
      });
      setCurrentIndex(index);
    };
  }, [containerRef]);

  return (
    <div className={`flex flex-col gap-4 items-center ${className}`} {...rest}>
      <div className="content w-full flex items-center">
        <div className="font-bold">{projectsContent.projects}</div>
      </div>
      {/**輪播區塊 */}
      <div className="w-full overflow-hidden" ref={containerRef}>
        <div className="flex gap-2 transition-all duration-300">
          {profile.portfolio.projects.map((item: ProjectItem) => (
            <ProjectLinkCard
              item={item}
              key={item.title.english}
              style={{ flex: `0 0 ${Math.floor(100 / visibleCount)}%` }}
            />
          ))}
        </div>
      </div>

      {/**導覽點 */}
      <div className="flex gap-2">
        {[...Array(total)].map((_, index) => (
          <button
            key={index}
            className={`rounded-full p-2 bg-white ${
              currentIndex  === index ? "" : "opacity-30"
            }`}
            onClick={() => scrollToPage(index)}
          />
        ))}
      </div>

      {/**了解更多 */}
      <Link className="note flex gap-1" href="/projects">
        {projectsContent.learnMore}
        <ArrowRightOutlined className="rotate-315" />
      </Link>
    </div>
  );
};
