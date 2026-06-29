import { MyMarkdown } from "@/components/MyMarkdown";
import { PortfolioItem } from "@/types";
import { getGithubReadMe, transformMarkdownLinks } from "@/utils/github";
import { OutsideLink } from "fanyucomponents";
import { Suspense } from "react";
import { ReadMeSvg } from "./ReadMeSvg";
import { cn } from "@/utils/className";
import { DivTitle } from "./DivTitle";

// 內部元件只需要 repo 字串
type ReadMeContentProps = {
  item: PortfolioItem;
};

const ReadMeContent = async ({ item }: ReadMeContentProps) => {
  const repo = item.github?.repo;
  if (!repo) return null;

  const content = await getGithubReadMe(repo);
  if (!content) return null;

  const newContent = transformMarkdownLinks(content, repo);
  return <MyMarkdown className="text-sm md:text-base">{newContent}</MyMarkdown>;
};

const ReadMeSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-11/12 rounded" />
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-4/5 rounded" />
    <div className="skeleton h-3 w-5/6 rounded" />
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-2/3 rounded" />
    <div className="skeleton h-3 w-3/4 rounded" />
  </div>
);

type ReadMeDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};

export const ReadMeDiv = ({ item, className, ...rest }: ReadMeDivProps) => {
  const repo = item.github?.repo;

  // repo 不存在就不渲染，連 Suspense 都不需要掛
  if (!repo) return null;

  const readMeUrl = `https://github.com/${repo}/blob/main/README.md`;

  return (
    <div {...rest} className={cn("flex flex-col gap-3", className)}>
      <DivTitle>
        <OutsideLink href={readMeUrl} className="flex items-center gap-2">
          <ReadMeSvg />
          <span>README</span>
        </OutsideLink>
      </DivTitle>
      <div className="card flex flex-col p-5 rounded-xl sm:p-6 lg:p-8">
        <Suspense fallback={<ReadMeSkeleton />}>
          <ReadMeContent item={item} />
        </Suspense>
      </div>
    </div>
  );
};
