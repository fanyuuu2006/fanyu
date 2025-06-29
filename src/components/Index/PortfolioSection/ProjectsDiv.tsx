import { profile } from "@/libs/profile";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ProjectLinkCard } from "./ProjectLinkCard";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { Carousel } from "@/components/custom/Carousel";
type ProjectsContent = Record<"projects" | "learnMore" | "refresh", string>;

const getProjectsContent = (language: LanguageOption): ProjectsContent =>
  ((
    {
      chinese: {
        projects: "專案",
        learnMore: "了解更多",
        refresh: "換一批",
      },
      english: {
        projects: "Projects",
        learnMore: "Learn more",
        refresh: "Refresh",
      },
    } as LanguageContent<ProjectsContent>
  )[language]);

export type ProjectsDivProps = React.HTMLAttributes<HTMLDivElement>;
export const ProjectsDiv = ({ className = "", ...rest }: ProjectsDivProps) => {
  const Language = useLanguage();
  const projectsContent = getProjectsContent(Language.Current);

  return (
    <div
      className={`flex flex-col p-2 gap-4 items-center max-w-full overflow-hidden ${className}`}
      {...rest}
    >
      <div className="w-full text-4xl font-bold">
        <span>{projectsContent.projects}</span>
      </div>

      {/* 輪播區塊 */}
      <Carousel groupCount={3}>
        {profile.portfolio.projects
          .sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          )
          .map((item) => (
            <ProjectLinkCard
              key={`${item.title.english}`}
              item={item}
              className="m-2 w-64 md:w-72"
            />
          ))}
      </Carousel>
      {/**了解更多 */}
      <Link
        className="text-2xl flex transition-all hover:-translate-x-2 group"
        href="/projects"
      >
        {projectsContent.learnMore}
        <ArrowRightOutlined className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-2" />
      </Link>
    </div>
  );
};
