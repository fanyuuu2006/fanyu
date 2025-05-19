"use client";
import { useLanguage } from "@/context/LanguageContext";
import { projectTagCategories } from "@/lib/projects";
import { LanguageContent, LanguageOption } from "@/types/language";
import { ProjectItem, ProjectTag, ProjectTagCategory } from "@/types/portfolio";
import {
  ArrowLeftOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectTagButton } from "./ProjectTagButton";
import { profile } from "../../lib/profile";
import { Collapse } from "fanyucomponents";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
type ProjectContent = Record<
  "Project" | "nofound" | "all" | "back" | "count" | ProjectTagCategory,
  string
>;

const getProjectContent = (language: LanguageOption): ProjectContent =>
  ((
    {
      chinese: {
        Project: "作品集",
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
      },
      english: {
        Project: "Project",
        all: "All",
        nofound: "No matching Project found",
        language: "Language",
        roles: "Development Role",
        domains: "Domain Expertise",
        frameworks: "Frameworks",
        libraries: "Libraries",
        tools: "Tools",
        other: "Other / Miscellaneous",
        back: "Back",
        count: "Total: {count}",
      },
    } as LanguageContent<ProjectContent>
  )[language]);

export const MainSection = () => {
  const Language = useLanguage();
  const projectContent = getProjectContent(Language.Current);

  const [categoriesShow, setCategoriesShow] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<ProjectTag | null>(null);

  const filteredProject = useMemo(() => {
    return !currentTag
      ? profile.portfolio.projects
      : profile.portfolio.projects.filter((item) =>
          item.tags.includes(currentTag)
        );
  }, [currentTag]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{projectContent.Project}</div>
        <div className="note flex flex-col w-full gap-2">
          <div className="relative flex flex-nowrap px-4 gap-4 justify-between">
            <button
              onClick={() => {
                setCategoriesShow((prev) => !prev);
              }}
              className="flex items-center w-fit gap-2"
            >
              {currentTag ?? projectContent.all}
              {categoriesShow ? <DownOutlined /> : <MenuOutlined />}
            </button>
            <span>
              {projectContent.count.replace(
                "{count}",
                filteredProject.length.toString()
              )}
            </span>
          </div>
          <Collapse
            className="slide-collapse absolute z-10 mt-8"
            state={categoriesShow}
          >
            <div className="card flex flex-col p-4 gap-2 bordered">
              <div>
                <ProjectTagButton
                  tag={null}
                  currentTag={currentTag}
                  setCurrentTag={setCurrentTag}
                  categoriesShow={categoriesShow}
                  setCategoriesShow={setCategoriesShow}
                >
                  {projectContent.all}
                </ProjectTagButton>
              </div>
              {Object.entries(projectTagCategories).map(([category, tags]) => (
                <div key={category} className="flex flex-col gap-2">
                  <span className="font-bold">
                    {projectContent[category as keyof ProjectContent]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <ProjectTagButton
                        key={tag}
                        tag={tag}
                        currentTag={currentTag}
                        setCurrentTag={setCurrentTag}
                        categoriesShow={categoriesShow}
                        setCategoriesShow={setCategoriesShow}
                      >
                        {tag}
                      </ProjectTagButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Collapse>
        </div>

        {filteredProject.length === 0 ? (
          <>{projectContent.nofound}</>
        ) : (
          <motion.div
            key={currentTag}
            variants={staggerContainer}
            initial="hiddenLeft"
            animate="show"
            className="w-full flex flex-col gap-4"
          >
            {filteredProject.map((item: ProjectItem) => (
              <ProjectCard
                variants={fadeInItem}
                key={item.title.english}
                item={item}
                currentTag={currentTag}
                setCurrentTag={setCurrentTag}
                categoriesShow={categoriesShow}
                setCategoriesShow={setCategoriesShow}
              />
            ))}
          </motion.div>
        )}
        <Link className="note" href="/#portfolio">
          <ArrowLeftOutlined /> {projectContent.back}
        </Link>
      </div>
    </section>
  );
};
