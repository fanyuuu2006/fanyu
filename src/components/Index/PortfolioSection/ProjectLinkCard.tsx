import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { ClockCircleOutlined, TagsOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";

const ProjectTag = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className="rounded-sm whitespace-nowrap px-2 bg-[var(--background-color-dark)] border border-[var(--border-color)]"
      {...rest}
    >
      {children}
    </span>
  );
};

export type ProjectLinkCardProps = OverrideProps<
  DistributiveOmit<React.ComponentProps<typeof Link>, "href">,
  {
    item: ProjectItem;
  }
>;
export const ProjectLinkCard = ({
  item,
  className = "",
  ...rest
}: ProjectLinkCardProps) => {
  const Language = useLanguage();
  const tagLimit = 5;

  return (
    <Link
      draggable={true}
      href={`/projects/${slugify(item.title.english)}`}
      aria-label={`View project: ${item.title.english}`}
      className={`${className} card flex flex-col items-center p-4 gap-4`}
      {...rest}
    >
      <Image
        className="bg-[#fff] border border-[var(--border-color)] w-3/5 h-auto rounded-full object-cover"
        src={item.imageSrc}
        alt={`${item.title.english} icon`}
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-2">
        <div className="content font-bold">{item.title[Language.Current]}</div>
        <div className="hint flex gap-2">
          <ClockCircleOutlined />
          {item.time}
        </div>
        <div className="note">{item.about[Language.Current]}</div>

        <div className="hint flex flex-nowrap gap-2">
          <TagsOutlined />
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, tagLimit).map((tag) => (
              <ProjectTag key={tag}>{tag}</ProjectTag>
            ))}
            {item.tags.length > tagLimit && (
              <ProjectTag>
                {
                  {
                    english: `+${item.tags.length - tagLimit} more`,
                    chinese: `還有 ${item.tags.length - tagLimit} 個`,
                  }[Language.Current]
                }
              </ProjectTag>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
