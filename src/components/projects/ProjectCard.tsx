import Image from "next/image";
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
import { ProjectTagButton } from "./ProjectTagButton";
import { SiNpm } from "react-icons/si";
import { HTMLMotionProps, motion } from "framer-motion";
import Giscus from "@giscus/react";
import { useState } from "react";

const categoryIcon: Record<ProjectLinkCategory, React.ReactNode> = {
  demo: <LinkOutlined />,
  github: <GithubOutlined />,
  package: <SiNpm />,
};

export type ProjectCardProps = OverrideProps<
  HTMLMotionProps<"div">,
  {
    item: ProjectItem;
    currentTag: ProjectTag | null;
    setCurrentTag: React.Dispatch<React.SetStateAction<ProjectTag | null>>;
    categoriesShow: boolean;
    setCategoriesShow: React.Dispatch<React.SetStateAction<boolean>>;
  }
>;

export const ProjectCard = ({
  item,
  currentTag,
  setCurrentTag,
  categoriesShow,
  setCategoriesShow,
  className = "",
  ...rest
}: ProjectCardProps) => {
  const Language = useLanguage();
  const [giscusShow, setGiscusShow] = useState<boolean>(false);

  return (
    <motion.div className="w-full flex flex-col" {...rest}>
      <div
        id={slugify(item.title.english)}
        className={`${className} card shadow w-full p-6 gap-4 flex flex-col md:flex-row`}
      >
        <Image
          className="bg-[#fff] border border-[var(--border-color)] h-25 w-fit  rounded-full"
          src={item.imageSrc}
          alt={`${item.title.english} icon`}
          width={300}
          height={300}
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
          {item.giscus && (
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
      {item.giscus && (
        <Collapse
          state={giscusShow}
          className={`w-full slide-collapse ${giscusShow ? "mt-4" : "mt-0"}`}
          id="giscus-container"
        >
          <Giscus
            repo={item.giscus.repo}
            repoId={item.giscus.repoId}
            categoryId={item.giscus.categoryId}
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
        </Collapse>
      )}
    </motion.div>
  );
};
