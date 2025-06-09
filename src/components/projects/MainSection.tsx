"use client";
import { useLanguage } from "@/context/LanguageContext";
import { projectTagCategories } from "@/lib/projects";
import { LanguageContent, LanguageOption } from "@/types/language";
import { ProjectItem, ProjectTag, ProjectTagCategory } from "@/types/portfolio";
import {
  ArrowLeftOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectTagButton } from "./ProjectTagButton";
import { profile } from "../../lib/profile";
import { Collapse } from "fanyucomponents";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { Tooltip } from "antd";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";
type ProjectsContent = Record<
  | "projects"
  | "nofound"
  | "all"
  | "back"
  | "count"
  | "filter"
  | ProjectTagCategory,
  string
>;

const getProjectsContent = (language: LanguageOption): ProjectsContent =>
  ((
    {
      chinese: {
        projects: "專案",
        all: "全部",
        nofound: "暫無符合條件的作品",
        language: "語言",
        roles: "開發角色",
        domains: "領域",
        frameworks: "框架",
        libraries: "函式庫",
        tools: "工具",
        other: "其他／雜項",
        back: "返回",
        count: "共 {count} 筆",
        filter: "篩選",
      },
      english: {
        projects: "Projects",
        all: "All",
        nofound: "No matching projects found",
        language: "Language",
        roles: "Development Role",
        domains: "Domain Expertise",
        frameworks: "Frameworks",
        libraries: "Libraries",
        tools: "Tools",
        other: "Other / Miscellaneous",
        back: "Back",
        count: "Total: {count}",
        filter: "Filter",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export const MainSection = () => {
  const Language = useLanguage();
  const projectsContent = getProjectsContent(Language.Current);

  const [categoriesShow, setCategoriesShow] = useState<boolean>(false);
  const [currentTags, setCurrentTags] = useState<Set<ProjectTag> | null>(null);
  const timeOrder = useTimeOrderTabs();

  const sortedProject = useMemo(() => {
    return (
      !currentTags
        ? profile.portfolio.projects
        : profile.portfolio.projects.filter((item) =>
            [...currentTags].every((tag) => item.tags.includes(tag))
          )
    ).sort((a, b) => {
      const t1 = new Date(a.time).getTime();
      const t2 = new Date(b.time).getTime();
      return timeOrder.isOrderByNewest ? t2 - t1 : t1 - t2;
    });
  }, [currentTags, timeOrder.isOrderByNewest]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <h1 className="title font-bold">{projectsContent.projects}</h1>
        <div className="note flex flex-col w-full gap-2">
          <div className="relative flex flex-nowrap items-center px-4 gap-4">
            <Tooltip title={projectsContent.filter}>
              <button
                onClick={() => {
                  setCategoriesShow((prev) => !prev);
                }}
                className="btn flex items-center w-fit gap-2 p-2 rounded-lg"
              >
                {categoriesShow ? <DownOutlined /> : <FilterOutlined />}
              </button>
            </Tooltip>
            <span>
              {projectsContent.count.replace(
                "{count}",
                sortedProject.length.toString()
              )}
            </span>
            <timeOrder.Div className="ms-auto" />
          </div>
          <Collapse className="slide-collapse" state={categoriesShow}>
            <div className="flex flex-col p-4 gap-2 bordered">
              <div>
                <ProjectTagButton
                  tag={null}
                  currentTags={currentTags}
                  setCurrentTags={setCurrentTags}
                >
                  {projectsContent.all}
                </ProjectTagButton>
              </div>
              {Object.entries(projectTagCategories).map(
                ([category, tags]) =>
                  tags.length > 0 && (
                    <div key={category} className="flex flex-col gap-2">
                      <span className="font-bold">
                        {projectsContent[category as keyof ProjectsContent]}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <ProjectTagButton
                            key={tag}
                            tag={tag}
                            currentTags={currentTags}
                            setCurrentTags={setCurrentTags}
                          >
                            {tag}
                          </ProjectTagButton>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </Collapse>
        </div>

        {sortedProject.length === 0 ? (
          <>{projectsContent.nofound}</>
        ) : (
          <motion.div
            key={`${currentTags}${timeOrder.isOrderByNewest}`}
            variants={staggerContainer}
            initial="hiddenLeft"
            animate="show"
            className="w-full flex flex-col gap-4"
          >
            {sortedProject.map((item: ProjectItem) => (
              <ProjectCard
                variants={fadeInItem}
                key={item.title.english}
                item={item}
                currentTags={currentTags}
                setCurrentTags={setCurrentTags}
              />
            ))}
          </motion.div>
        )}
        <Link className="note" href="/#portfolio">
          <ArrowLeftOutlined />
          {projectsContent.back}
        </Link>
      </div>
    </section>
  );
};
