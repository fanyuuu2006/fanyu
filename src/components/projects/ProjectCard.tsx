import {
  ProjectItem,
  ProjectLinkCategory,
  ProjectTag,
} from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { useLanguage } from "@/context/LanguageContext";
import { Collapse, OutsideLink, OverrideProps } from "fanyucomponents";
import {
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { ProjectTagCheckbox } from "./ProjectTagCheckbox";
import { SiNpm } from "react-icons/si";
import { HTMLMotionProps, motion } from "framer-motion";
import Giscus from "@giscus/react";
import { useState } from "react";
import { getGithubBadgeSrcs } from "@/utils/github";

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

  return (
    <motion.article className="w-full flex flex-col" {...rest}>
      <div
        id={slugify(item.title.english)}
        className={`${className} card shadow w-full p-6 gap-4 flex flex-col md:flex-row`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          className="bg-[#fff] border border-[var(--border-color)] h-25 w-fit  rounded-full"
          src={item.imageSrc}
          alt={`${item.title.english} icon`}
        />
        <div className="flex flex-col flex-1 gap-2">
          <div className="content font-bold">
            {item.title[Language.Current]}
          </div>
          <div className="hint flex gap-2">
            <ClockCircleOutlined />
            {item.time}
          </div>
          <div className="note text-justify">
            {item.about[Language.Current]}
          </div>
          {item.links.map((link) => (
            <OutsideLink
              key={link.href}
              href={link.href}
              className="hint w-fit flex flex-nowrap items-center gap-2 opacity-70"
            >
              {categoryIcon[link.category]}
              <span className="wrap-anywhere">{link.href}</span>
            </OutsideLink>
          ))}
          <ul className="note text-justify list-disc ps-4">
            {item.description[Language.Current].map((part, index) => (
              <li key={index}>{part}</li>
            ))}
          </ul>
          <div className="hint flex flex-nowrap gap-2">
            <TagsOutlined />
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
            <div className="w-full flex mt-2">
              <button
                onClick={() => {
                  setGiscusShow((prev) => !prev);
                }}
                className={`${
                  giscusShow ? "opacity-70" : ""
                } btn-primary hint px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105`}
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
      {item.github && (
        <Collapse
          state={giscusShow}
          className={`w-full slide-collapse flex flex-col items-center gap-4 ${
            giscusShow ? "mt-4" : "mt-0"
          }`}
          id="github-container"
        >
          <div className="flex flex-wrap gap-4">
            {getGithubBadgeSrcs(item.github.repo).map((item) => (
              /* eslint-disable-next-line @next/next/no-img-element*/
              <img
                draggable={false}
                key={item.title}
                src={item.url}
                alt={item.title}
                title={item.title}
                className="h-6 object-cover select-none"
              />
            ))}
          </div>
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
        </Collapse>
      )}
    </motion.article>
  );
};
