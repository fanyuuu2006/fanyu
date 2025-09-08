"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectTagCategories } from "@/libs/projects";
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
import { ProjectTagCheckbox } from "./ProjectTagCheckbox";
import { profile } from "../../libs/profile";
import { Collapse } from "fanyucomponents";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { Tooltip } from "antd";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";
import { Title } from "@/components/custom/Title";
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
        "frameworks/libraries": "框架/函式庫",
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
        "frameworks/libraries": "Frameworks/Libraries",
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
  const timeOrder = useTimeOrderTabs(
    profile.portfolio.projects,
    (item) => item.time
  );

  const sortedProject = useMemo(() => {
    return !currentTags
      ? timeOrder.sortedData
      : timeOrder.sortedData.filter((item) =>
          [...currentTags].some((tag) => item.tags.includes(tag))
        );
  }, [currentTags, timeOrder.sortedData]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Title className="text-5xl font-bold">{projectsContent.projects}</Title>
        <div className="flex flex-col w-full gap-2">
          <div className="relative text-2xl flex flex-nowrap items-center px-4 gap-4">
            <Tooltip title={projectsContent.filter}>
              <button
                onClick={() => setCategoriesShow((prev) => !prev)}
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
            <div className="flex flex-col p-4 gap-2">
              <div>
                <ProjectTagCheckbox
                  tag={null}
                  className="text-xl font-bold"
                  currentTags={currentTags}
                  setCurrentTags={setCurrentTags}
                >
                  {projectsContent.all}
                </ProjectTagCheckbox>
              </div>
              {Object.entries(projectTagCategories).map(
                ([category, tags]) =>
                  tags.length > 0 && (
                    <div key={category} className="flex flex-col gap-2">
                      <span className="text-2xl font-bold">
                        {projectsContent[category as keyof ProjectsContent]}
                      </span>
                      <div className="text-xl flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <ProjectTagCheckbox
                            key={tag}
                            tag={tag}
                            currentTags={currentTags}
                            setCurrentTags={setCurrentTags}
                          >
                            {tag}
                          </ProjectTagCheckbox>
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
            variants={staggerContainer}
            initial="hiddenLeft"
            animate="show"
            className=" w-full flex flex-col gap-4"
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
        <Link
          className="text-2xl transition-all hover:translate-x-2 group"
          href="/#portfolio"
        >
          <ArrowLeftOutlined className="opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-x-2" />
          {projectsContent.back}
        </Link>
      </div>
    </section>
  );
};
