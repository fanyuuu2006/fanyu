import { useEffect, useRef, useState } from "react";
import { profile } from "@/libs/profile";
import { ProjectItem } from "@/types/portfolio";
import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";

const projectCount = 3;

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

  const [shuffledProject, setShuffledProject] = useState<ProjectItem[] | null>(
    null
  );
  const turnRef = useRef<HTMLSpanElement>(null);

  const shuffleProject = () => {
    const shuffled = profile.portfolio.projects
      .toSorted(() => Math.random() - 0.5)
      .slice(0, projectCount);
    setShuffledProject(shuffled);
  };

  useEffect(() => {
    shuffleProject();
  }, []);

  if (!shuffledProject) return null;

  return (
    <div className={`flex flex-col p-2 gap-4 items-center ${className}`} {...rest}>
      <div className="content w-full flex justify-between items-center">
        <div className="font-bold">{projectsContent.projects}</div>
        <button
          className="flex items-center justify-center w-10 h-10 p-1 rounded-sm"
          onClick={shuffleProject}
        >
          <Tooltip title={projectsContent.refresh}>
            <ReloadOutlined
              ref={turnRef}
              className="transition-[rolate]"
              onClick={() => {
                if (!turnRef.current) return;
                turnRef.current?.classList.add("animate-turn");
                setTimeout(() => {
                  turnRef.current?.classList.remove("animate-turn");
                }, 200);
              }}
            />
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
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-1 basis-full md:basis-3/10"
          >
            <ProjectLinkCard item={item} className="w-full" />
          </motion.div>
        ))}
      </motion.div>
      <Link className="note flex transition-all hover:-translate-x-2 group" href="/projects">
        {projectsContent.learnMore}
        <ArrowRightOutlined className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-2" />
      </Link>
    </div>
  );
};
