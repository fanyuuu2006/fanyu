import Image from "next/image";
import { PortfolioItem, PortfolioLinkCategory } from "@/types/portfolio";
import { slugify } from "@/utils/url";
import { useLanguage } from "@/context/LanguageContext";
import { OutsideLink } from "fanyucomponents";
import {
  ClockCircleOutlined,
  CodeSandboxOutlined,
  GithubOutlined,
  LinkOutlined,
  TagOutlined,
} from "@ant-design/icons";

const categoryIcon: Record<PortfolioLinkCategory, React.ReactNode> = {
  demo: <LinkOutlined />,
  github: <GithubOutlined />,
  package: <CodeSandboxOutlined />,
};

export interface PortfolioCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: PortfolioItem;
}

export const PortfolioCard = ({ item, ...rest }: PortfolioCardProps) => {
  const Language = useLanguage();
  return (
    <div
      id={slugify(item.title.english)}
      className="card bordered shadow w-full p-4 gap-4 flex flex-col md:flex-row"
      {...rest}
    >
      <Image
        className="title shadow h-16 w-fit  rounded-full"
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
        <div className="note">{item.about[Language.Current]}</div>
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
        <ul className="note list-disc ps-6">
          {item.description[Language.Current].map((part, index) => (
            <li key={index}>{part}</li>
          ))}
        </ul>
        <div className="hint flex flex-nowrap gap-2">
          <TagOutlined />
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                className="whitespace-nowrap px-2 rounded-sm bg-[var(--background-color)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
