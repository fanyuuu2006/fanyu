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
  className = "",
  ...rest
}: ProjectCardProps) => {
  const Language = useLanguage();
  const [giscusShow, setGiscusShow] = useState<boolean>(false);
  const projectContent = useMemo(
    () => getProjectContent(Language.Current),
    [Language.Current]
  );

  return (
    <motion.article className="w-full flex flex-col" {...rest}>
      <div
        id={slugify(item.title.english)}
        className={`${className} card shadow w-full p-6 md:p-8 gap-4 flex flex-col md:flex-row`}
      >
        {/* 專案圖片 */}
        <div>
          <div className="h-25 w-25 shrink-0 border-2 border-[var(--border-color)] rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              className="h-full w-full bg-[#fff] object-cover"
              src={item.imageSrc}
              alt={`${item.title.english} icon`}
            />
          </div>
        </div>

        {/* 專案資訊 */}
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-color)] leading-tight">
                {item.title[Language.Current]}
              </h3>
              <p className="text-lg md:text-xl text-[var(--text-color-muted)] text-justify leading-relaxed">
                {item.about[Language.Current]}
              </p>
              <div className="flex items-center gap-2 text-base md:text-lg text-[var(--text-color-muted)]">
                <ClockCircleOutlined />
                <span className="font-medium">{item.time}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {item.links.map((link) => (
                  <CustomLink
                    key={link.href}
                    href={link.href}
                    className="max-w-full text-[var(--text-color-muted)] text-sm md:text-base flex items-center gap-2"
                  >
                    {categoryIcon[link.category]}
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {link.href}
                    </span>
                  </CustomLink>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 md:p-6 rounded-3xl border border-[var(--border-color)]">
              <h4 className="text-[var(--text-color-muted)] text-lg md:text-xl lg:text-2xl font-bold">
                {projectContent.projectFeature}
              </h4>
              <ul className="text-base md:text-lg text-justify list-disc ps-5 space-y-2">
                {item.description[Language.Current].map((part, index) => (
                  <li key={index}>{part}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 p-4 md:p-6 rounded-3xl border border-[var(--border-color)]">
              <h4 className="text-[var(--text-color-muted)] text-lg md:text-xl lg:text-2xl font-bold">
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

            {item.github && (
              <div className="w-full flex">
                <button
                  onClick={() => {
                    setGiscusShow((prev) => !prev);
                  }}
                  className={`btn-${
                    giscusShow ? "tertiary" : "primary"
                  } text-base md:text-lg px-4 py-2 rounded-xl`}
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
      </div>
      {item.github && (
        <Collapse
          state={giscusShow}
          className={`w-full slide-collapse flex flex-col items-center gap-6 ${
            giscusShow ? "mt-6" : ""
          }`}
          id="github-container"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {getGithubBadgeSrcs(item.github.repo).map((item) => (
              /* eslint-disable-next-line @next/next/no-img-element*/
              <img
                draggable={false}
                key={item.title}
                src={item.url}
                alt={item.title}
                title={item.title}
                className="h-6 object-cover select-none transition-transform duration-200 hover:scale-110"
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
        </Collapse>
      )}
    </motion.article>
  );
};
