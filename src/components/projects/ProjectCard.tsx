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
import { proxyUrl } from "../../utils/url";
import { MyImage } from "../custom/MyImage";

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
        className={cn("card w-full p-6 md:p-8 flex flex-col gap-6", className)}
      >
        {/* 標題區域 */}
        <div className="flex items-start flex-col lg:flex-row gap-4 lg:gap-6">
          {/* 專案圖片 */}
          <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-2xl overflow-hidden border-2 border-[var(--border-color)]">
            <MyImage
              src={proxyUrl(item.imageSrc)}
              alt={`${item.title.english} icon`}
              className="w-full h-full object-cover bg-white select-none"
              loading="lazy"
            />
          </div>

          {/* 標題與時間 */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-color)] leading-tight">
                {item.title[Language.Current]}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--text-color-muted)] text-justify leading-relaxed">
                {item.about[Language.Current]}
              </p>
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-[var(--text-color-muted)] flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-[var(--text-color-muted)] font-medium">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 內容區域 */}
        <div className="flex flex-col gap-5">
          {/* 連結 */}
          <div className="flex gap-2 flex-wrap">
            {item.links.map((link) => (
              <CustomLink
                key={link.href}
                href={link.href}
                className="btn-primary font-medium text-xs sm:text-sm md:text-base flex gap-2 px-4 py-2 rounded-full items-center"
              >
                <span className="text-base">{categoryIcon[link.category]}</span>
                <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px] sm:max-w-[200px] md:max-w-[250px]">
                  {link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
              </CustomLink>
            ))}
          </div>

          {/* 專案特色 */}
          <div className="flex flex-col gap-3 p-4 sm:p-5 md:p-6 rounded-xl bg-[var(--card-background)] border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color-muted)] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              {projectContent.projectFeature}
            </h4>
            <ul className="text-sm sm:text-base leading-relaxed list-disc ps-5 space-y-3 text-[var(--text-color)]">
              {item.description[Language.Current].map((part, index) => (
                <li key={index} className="leading-relaxed">
                  {part}
                </li>
              ))}
            </ul>
          </div>

          {/* 技能標籤 */}
          <div className="flex flex-col gap-3 p-4 sm:p-5 md:p-6 rounded-xl bg-[var(--card-background)] border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color-muted)] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              {projectContent.skillTag}
            </h4>
            <div className="text-sm md:text-base lg:text-lg flex flex-wrap gap-1">
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
            <div className="w-full flex justify-center lg:justify-end mt-4">
              <button
                onClick={() => {
                  setGiscusShow((prev) => !prev);
                }}
                className={`btn-${
                  giscusShow ? "tertiary" : "primary"
                } text-sm md:text-base lg:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
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
          <div className="p-4 sm:p-6 lg:p-7 w-full">
            <div className="flex flex-wrap gap-3 justify-center mb-7">
              {getGithubBadgeSrcs(item.github.repo).map((badgeItem) => (
                /* eslint-disable-next-line @next/next/no-img-element*/
                <img
                  draggable={false}
                  key={badgeItem.title}
                  src={badgeItem.url}
                  alt={badgeItem.title}
                  title={badgeItem.title}
                  className="h-5 md:h-6 object-cover select-none"
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
