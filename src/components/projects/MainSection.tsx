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
import { cn } from "@/utils/className";

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
  // 獲取當前語言設定
  const Language = useLanguage();
  const projectsContent = getProjectsContent(Language.Current);

  // 狀態管理
  const [categoriesShow, setCategoriesShow] = useState<boolean>(false); // 控制篩選區域的顯示/隱藏
  const [currentTags, setCurrentTags] = useState<Set<ProjectTag> | null>(null); // 當前選中的標籤集合

  const timeOrder = useTimeOrderTabs(profile.portfolio.projects, [
    (item) => item.time,
  ]);

  /**
   * 根據選中的標籤篩選專案
   * 使用 useMemo 優化性能，只有在標籤或專案數據改變時才重新計算
   */
  const sortedProject = useMemo(() => {
    return !currentTags
      ? timeOrder.data // 未選擇標籤時顯示所有專案
      : timeOrder.data.filter(
          (item) => [...currentTags].some((tag) => item.tags.includes(tag)) // 篩選包含選中標籤的專案
        );
  }, [currentTags, timeOrder.data]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        {/* 頁面標題 */}
        <Title className="text-5xl font-bold">{projectsContent.projects}</Title>

        <div className="flex flex-col w-full gap-4">
          {/* 控制列：包含篩選按鈕、專案計數、時間排序切換 */}
          <div className="flex flex-nowrap items-center justify-between px-6 py-4 bg-[var(--background-color-secondary)] rounded-xl border border-[var(--border-color)]">
            <div className="flex items-center gap-4">
              {/* 篩選按鈕：控制標籤區域的顯示/隱藏 */}
              <Tooltip title={projectsContent.filter}>
                <button
                  onClick={() => setCategoriesShow((prev) => !prev)}
                  className={`${
                    categoriesShow ? "btn-tertiary" : "btn-primary"
                  } flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300`}
                >
                  {/* 圖標會根據展開狀態旋轉 */}
                  <div
                    className={cn("transition-transform duration-300", {
                      "rotate-180": categoriesShow,
                    })}
                  >
                    {categoriesShow ? <DownOutlined /> : <FilterOutlined />}
                  </div>
                  {/* 篩選文字在小螢幕上隱藏 */}
                  <span className="hidden sm:inline font-medium">
                    {projectsContent.filter}
                  </span>
                </button>
              </Tooltip>

              {/* 專案計數顯示：帶有動態指示燈 */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-[var(--text-color-muted)]">
                  {projectsContent.count.replace(
                    "{count}",
                    sortedProject.length.toString()
                  )}
                </span>
              </div>
            </div>

            {/* 時間排序切換元件 */}
            <timeOrder.div />
          </div>

          {/* 篩選標籤區域：可折疊的標籤選擇面板 */}
          <Collapse className="slide-collapse" state={categoriesShow}>
            <div className="flex flex-col gap-6 px-6 py-4">
              {/* 全部選項：重置所有篩選條件 */}
              <div className="flex">
                <ProjectTagCheckbox
                  tag={null} // null 代表「全部」選項
                  currentTags={currentTags}
                  setCurrentTags={setCurrentTags}
                >
                  {projectsContent.all}
                </ProjectTagCheckbox>
              </div>

              {/* 標籤分類區域：依照不同類別組織標籤 */}
              <div className="flex flex-col gap-3">
                {Object.entries(projectTagCategories).map(
                  ([category, tags]) =>
                    tags.length > 0 && (
                      <div key={category} className="space-y-3">
                        {/* 分類標題：帶有視覺指示條 */}
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-6 bg-gradient-to-b from-[var(--text-color-primary)] to-[var(--text-color-secondary)] rounded-full"></div>
                          <h3 className="text-xl font-bold text-[var(--text-color-primary)]">
                            {projectsContent[category as keyof ProjectsContent]}
                          </h3>
                        </div>

                        {/* 該分類下的所有標籤 */}
                        <div className="flex flex-wrap gap-3 pl-4">
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
            </div>
          </Collapse>
        </div>

        {/* 專案列表區域：根據篩選結果顯示專案或無結果提示 */}
        {sortedProject.length === 0 ? (
          // 無符合條件的專案時顯示提示訊息
          <>{projectsContent.nofound}</>
        ) : (
          // 專案卡片列表：使用 Framer Motion 提供進入動畫
          <motion.div
            variants={staggerContainer} // 容器動畫變體：子元素依序進入
            initial="hiddenLeft" // 初始狀態：從左側隱藏
            animate="show" // 動畫到顯示狀態
            className=" w-full flex flex-col gap-4"
          >
            {sortedProject.map((item: ProjectItem) => (
              <ProjectCard
                variants={fadeInItem} // 單個卡片的淡入動畫
                key={item.title.english} // 使用英文標題作為唯一鍵值
                item={item} // 專案數據
                currentTags={currentTags} // 當前選中的標籤（用於高亮顯示）
                setCurrentTags={setCurrentTags} // 標籤狀態更新函數
              />
            ))}
          </motion.div>
        )}

        {/* 返回連結：回到首頁的 portfolio 區段 */}
        <Link
          className="text-xl md:text-2xl text-[var(--text-color-muted)] transition-all hover:translate-x-2 group"
          href="/#portfolio"
        >
          {/* 返回箭頭：hover 時會向左移動並顯示 */}
          <ArrowLeftOutlined className="opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-x-2" />
          {projectsContent.back}
        </Link>
      </div>
    </section>
  );
};
