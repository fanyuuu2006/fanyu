import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { ProjectItem } from "@/types/portfolio";
import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";

type ProjectsContent = Record<"projects" | "viewMore" | "shuffle", string>;

const getProjectsContent = (language: LanguageOption): ProjectsContent =>
  ((
    {
      chinese: {
        projects: "專案",
        viewMore: "查看全部",
        shuffle: "換一批",
      },
      english: {
        projects: "Projects",
        viewMore: "View all",
        shuffle: "Shuffle",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export type ProjectsDivProps = React.HTMLAttributes<HTMLDivElement>;

export const ProjectsDiv = ({ className, ...rest }: ProjectsDivProps) => {
  const Language = useLanguage();
  const projectsContent = getProjectsContent(Language.Current);

  const [shuffledProject, setShuffledProject] = useState<ProjectItem[] | null>(
    null
  );

  const shuffleProject = () => {
    const shuffled = profile.portfolio.projects
      .toSorted(() => Math.random() - 0.5)
      .slice(0, 3);
    setShuffledProject(shuffled);
  };

  useEffect(() => {
    shuffleProject();
  }, []);

  if (!shuffledProject) return null;

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`} {...rest}>
      <div className="content font-bold">{projectsContent.projects}</div>
      <div className="flex flex-wrap justify-between gap-4">
        {shuffledProject.map((item: ProjectItem) => (
          <ProjectLinkCard key={item.title.english} item={item} />
        ))}
      </div>
      <div className="w-full flex justify-between note items-center">
        <span /> {/**分散對齊用*/}
        <Link className="flex gap-1" href="/projects">
          {projectsContent.viewMore}
          <ArrowRightOutlined className="rotate-315" />
        </Link>
        <button
          className="btn flex items-center justify-center w-8 h-8 p-1 rounded-sm"
          onClick={shuffleProject}
        >
          <Tooltip title={projectsContent.shuffle}>
            <ReloadOutlined />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};
