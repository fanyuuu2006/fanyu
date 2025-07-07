import {
  ProjectItem,
  ProjectLinkCategory,
  ProjectTag,
} from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { useLanguage } from "@/contexts/LanguageContext";
import { Collapse, OverrideProps } from "fanyucomponents";
import {
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { ProjectTagCheckbox } from "./ProjectTagCheckbox";
import { SiNpm } from "react-icons/si";
import { HTMLMotionProps, motion } from "framer-motion";
import Giscus from "@giscus/react";
import { useMemo, useState } from "react";
import { getGithubBadgeSrcs } from "@/utils/github";
import { CustomLink } from "../custom/CustomLink";
import { LanguageOption, LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";

type ProjectContent = Record<"skillTag" | "projectFeature", string>;
const getProjectContent = (language: LanguageOption): ProjectContent =>
  ((
    {
      chinese: {
        skillTag: "技能標籤",
        projectFeature: "專案特色",
      },
      english: {
        skillTag: "Skill Tags",
        projectFeature: "Project Features",
      },
    } as LanguageContent<ProjectContent>
  )[language]);

const categoryIcon: Record<ProjectLinkCategory, React.ReactNode> = {
  demo: <LinkOutlined />,
  github: <GithubOutlined />,
  package: <SiNpm />,
};

export type ProjectCardProps = OverrideProps<
  HTMLMotionProps<"article">,
  {
    item: ProjectItem;
    currentTags: Set<ProjectTag> | null;
    setCurrentTags: React.Dispatch<
      React.SetStateAction<Set<ProjectTag> | null>
    >;
  }
>;

export const ProjectCard = ({
  item,
  currentTags,
  setCurrentTags,
  className,
  ...rest
}: ProjectCardProps) => {
  const Language = useLanguage();
  const [giscusShow, setGiscusShow] = useState<boolean>(false);
  const projectContent = useMemo(
    () => getProjectContent(Language.Current),
    [Language.Current]
  );

  return (
    <motion.article
      id={slugify(item.title.english)}
      className="w-full"
      {...rest}
    >
      <div
        className={`${className} card w-full p-6 lg:p-8 gap-6 flex flex-col lg:flex-row`}
      >
        {/* 專案圖片 */}
        <div className="shrink-0">
          <div className="h-28 w-28 lg:h-32 lg:w-32 border-2 border-[var(--border-color)] rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[var(--border-color-light)] group-hover:shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              className="h-full w-full bg-white object-cover"
              src={item.imageSrc}
              alt={`${item.title.english} icon`}
            />
          </div>
        </div>

        {/* 專案資訊 */}
        <div className="flex-1 flex flex-col gap-3">
          {/* 標題和描述 */}
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-color)] leading-tight hover:underline-spread transition-colors duration-300">
              {item.title[Language.Current]}
            </h3>
            <p className="text-lg md:text-xl text-[var(--text-color-muted)] text-justify leading-relaxed">
              {item.about[Language.Current]}
            </p>
            <div className="flex items-center gap-2 text-base md:text-lg text-[var(--text-color-muted)]">
              <ClockCircleOutlined />
              <span className="font-medium">{item.time}</span>
            </div>
          </div>

          {/* 連結區域 */}
          <div className="flex gap-3 flex-wrap">
            {item.links.map((link) => (
              <CustomLink
                key={link.href}
                href={link.href}
                className="max-w-full btn text-[var(--text-color-muted)] text-sm md:text-base flex items-center gap-1 px-3 py-2 rounded-full"
              >
                {categoryIcon[link.category]}
                <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {link.href}
                </span>
              </CustomLink>
            ))}
          </div>

          {/* 專案特色 */}
          <div className="rounded-2xl p-4 md:p-6 bg-[var(--background-color-tertiary)] border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color)] text-lg md:text-xl lg:text-2xl font-bold mb-3">
              {projectContent.projectFeature}
            </h4>
            <ul className="text-base md:text-lg text-justify list-disc ps-5 space-y-2 text-[var(--text-color-muted)]">
              {item.description[Language.Current].map((part, index) => (
                <li key={index} className="leading-relaxed">
                  {part}
                </li>
              ))}
            </ul>
          </div>

          {/* 技能標籤 */}
          <div className="rounded-2xl p-4 md:p-6 bg-[var(--background-color-tertiary)] border border-[var(--border-color)]">
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-3">
              {projectContent.skillTag}
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
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

          {/* 討論區按鈕 */}
          {item.github && (
            <div className="w-full">
              <button
                onClick={() => {
                  setGiscusShow((prev) => !prev);
                }}
                className={`btn-${
                  giscusShow ? "tertiary" : "primary"
                } text-base md:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
              >
                {
                  (giscusShow
                    ? { chinese: "關閉討論區", english: "Close Discussion" }
                    : { chinese: "展開討論區", english: "Open Discussion" })[
                    Language.Current
                  ]
                }
              </button>
            </div>
          )}
        </div>
      </div>

      {/* GitHub 討論區 */}
      {item.github && (
        <Collapse
          state={giscusShow}
          className={cn(
            `w-full slide-collapse flex flex-col items-center gap-6`,
            {
              "mt-6": giscusShow,
            }
          )}
          id="github-container"
        >
          <div className="card p-6 w-full">
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              {getGithubBadgeSrcs(item.github.repo).map((badgeItem) => (
                /* eslint-disable-next-line @next/next/no-img-element*/
                <img
                  draggable={false}
                  key={badgeItem.title}
                  src={badgeItem.url}
                  alt={badgeItem.title}
                  title={badgeItem.title}
                  className="h-6 object-cover select-none"
                />
              ))}
            </div>
            <div className="w-full">
              <Giscus
                repo={item.github.repo}
                repoId={item.github.repoId}
                categoryId={item.github.categoryId}
                category="Announcements"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="dark"
                lang={Language.Current === "chinese" ? "zh-TW" : "en"}
                loading="lazy"
              />
            </div>
          </div>
        </Collapse>
      )}
    </motion.article>
  );
};
