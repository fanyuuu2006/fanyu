import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { ProjectItem } from "@/types/portfolio";
import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";

type ProjectsContent = Record<"projects" | "viewMore" | "refresh", string>;

const getProjectsContent = (language: LanguageOption): ProjectsContent =>
  ((
    {
      chinese: {
        projects: "專案",
        viewMore: "查看全部",
        refresh: "換一批",
      },
      english: {
        projects: "Projects",
        viewMore: "View all",
        refresh: "Refresh",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export type ProjectsDivProps = React.HTMLAttributes<HTMLDivElement>;

export const ProjectsDiv = ({ className = "", ...rest }: ProjectsDivProps) => {
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
    <div className={`flex flex-col gap-4 items-center ${className}`} {...rest}>
      <div className="content w-full flex justify-between items-center">
        <div className="font-bold">{projectsContent.projects}</div>
        <button
          className="flex items-center justify-center w-10 h-10 p-1 rounded-sm"
          onClick={shuffleProject}
        >
          <Tooltip title={projectsContent.refresh}>
            <ReloadOutlined className="transition-transform duration-200 active:rotate-180" />
          </Tooltip>
        </button>
      </div>
      <motion.div
        key={JSON.stringify(shuffledProject)}
        variants={staggerContainer}
        initial="hiddenBottom"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap justify-between gap-4"
      >
        {shuffledProject.map((item: ProjectItem) => (
          <motion.div
            key={item.title.english}
            variants={fadeInItem}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-1 basis-full md:basis-3/10"
          >
            <ProjectLinkCard item={item} />
          </motion.div>
        ))}
      </motion.div>
      <Link className="note flex gap-1" href="/projects">
        {projectsContent.viewMore}
        <ArrowRightOutlined className="rotate-315" />
      </Link>
    </div>
  );
};
