"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { ProjectItem } from "@/types/portfolio";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { ProjectCard } from "./ProjectCard";
import Giscus from "@giscus/react";
import { useRouter } from "next/navigation";
type ProjectContent = Record<"nofound" | "projects", string>;

const getProjectContent = (language: LanguageOption): ProjectContent =>
  ((
    {
      chinese: {
        nofound: "暫無符合條件的作品",
        projects: "專案",
      },
      english: {
        nofound: "No matching Project found",
        projects: "Projects",
      },
    } as LanguageContent<ProjectContent>
  )[language]);

export const MainSection = ({ title }: { title: string }) => {
  const Language = useLanguage();
  const projectContent = getProjectContent(Language.Current);
  const [matchingProject, setMatchingProject] = useState<ProjectItem | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const project = profile.portfolio.projects.find(
      (project) => project.title.english === title
    );

    if (!project) {
      return;
    }

    setMatchingProject(project);
  }, [title]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="w-full">
          <ArrowLeftOutlined
            className="content"
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <div className="title font-bold">{projectContent.projects}</div>
        {!matchingProject ? (
          <>{projectContent.nofound}</>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hiddenLeft"
              animate="show"
              className="w-full flex flex-col gap-4"
            >
              <ProjectCard variants={fadeInItem} item={matchingProject} />
            </motion.div>
            {matchingProject.giscus && (
              <div
                className="w-full"
                id="giscus-container"
              >
                <Giscus
                  repo={matchingProject.giscus.repo}
                  repoId={matchingProject.giscus.repoId}
                  categoryId={matchingProject.giscus.categoryId}
                  category="Announcements"
                  mapping="pathname"
                  strict="0"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme="preferred_color_scheme"
                  lang={Language.Current === "chinese" ? "zh-TW" : "en"}
                  loading="lazy"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
