import { MyMarkdown } from "@/components/MyMarkdown";
import { PortfolioItem } from "@/types";
import { getGithubReadMe } from "@/utils/github";
import { OutsideLink } from "fanyucomponents";
import { Suspense } from "react";
import { ReadMeSvg } from "./ReadMeSvg";

type ReadMeSectionProps = {
  item: PortfolioItem;
};

// 內部元件只需要 repo 字串
type ReadMeContentProps = {
  repo: NonNullable<PortfolioItem["github"]>["repo"];
};

const ReadMeContent = async ({ repo }: ReadMeContentProps) => {
  const content = await getGithubReadMe(repo);
  if (!content) return null;

  return <MyMarkdown className="text-(--muted)">{content}</MyMarkdown>;
};

const ReadMeSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="skeleton h-3 w-1/2 rounded" />
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-5/6 rounded" />
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-2/3 rounded" />
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-3/4 rounded" />
  </div>
);

export const ReadMeSection = ({ item }: ReadMeSectionProps) => {
  const repo = item.github?.repo;

  // repo 不存在就不渲染，連 Suspense 都不需要掛
  if (!repo) return null;

  const readMeUrl = `https://github.com/${repo}/blob/main/README.md`;

  return (
    <section>
      <div className="container">
        <div className="card p-6 rounded-lg flex flex-col gap-4">
          <OutsideLink href={readMeUrl}>
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-(--muted)">
              <ReadMeSvg />
              <span>README</span>
            </h3>
          </OutsideLink>
          <Suspense fallback={<ReadMeSkeleton />}>
            <ReadMeContent repo={repo} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
