import Image from "next/image";
import {
  ProjectItem,
  ProjectLinkCategory,
  ProjectTag,
} from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { useLanguage } from "@/context/LanguageContext";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import {
  ClockCircleOutlined,
  CodeSandboxOutlined,
  GithubOutlined,
  LinkOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { ProjectTagButton } from "./ProjectTagButton";

const categoryIcon: Record<ProjectLinkCategory, React.ReactNode> = {
  demo: <LinkOutlined />,
  github: <GithubOutlined />,
  package: <CodeSandboxOutlined />,
};

export type ProjectCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ProjectItem;
    currentTag: ProjectTag | null;
    setCurrentTag: React.Dispatch<React.SetStateAction<ProjectTag | null>>;
    setCategoriesShow: React.Dispatch<React.SetStateAction<boolean>>;
  }
>;

export const ProjectCard = ({
  item,
  currentTag,
  setCurrentTag,
  setCategoriesShow,
  className,
  ...rest
}: ProjectCardProps) => {
  const Language = useLanguage();
  return (
    <div
      id={slugify(item.title.english)}
      className={`${
        className ?? ""
      } card bordered shadow w-full p-6 gap-4 flex flex-col md:flex-row`}
      {...rest}
    >
      <Image
        className="title bg-[#fff] bordered h-20 w-fit  rounded-full"
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
        width={300}
        height={300}
      />
      <div className="flex flex-col flex-1 gap-2">
        <div className="content font-bold">{item.title[Language.Current]}</div>
        <div className="hint flex gap-2">
          <ClockCircleOutlined />
          {item.time}
        </div>
        <div className="note text-justify">{item.about[Language.Current]}</div>
        {item.links.map((link) => (
          <OutsideLink
            key={link.href}
            href={link.href}
            className="hint w-fit flex flex-nowrap gap-2 opacity-70"
          >
            {categoryIcon[link.category]}
            <span>{link.href}</span>
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
                setCategoriesShow={setCategoriesShow}
              >
                {tag}
              </ProjectTagButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
