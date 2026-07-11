import { MyMarkdown } from "@/components/MyMarkdown";
import { PortfolioItem } from "@/types";
import { getGithubReadMe, transformMarkdownLinks } from "@/utils/github";
import { OutsideLink } from "fanyucomponents";
import { cn } from "@/utils/className";
import ReadMeSvg from "@/components/svgs/ReadMeSvg";
import { ReadMeOutline } from "./ReadMeOutline";

type ReadMeDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};

export const ReadMeDiv = async ({
  item,
  className,
  ...rest
}: ReadMeDivProps) => {
  const repo = item.github?.repo;
  if (!repo) return null;

  const content = await getGithubReadMe(repo);
  if (!content) return null;

  const readMeUrl = `https://github.com/${repo}/blob/main/README.md`;

  return (
    <div {...rest} className={cn("flex flex-col gap-3", className)}>
      <div className="card relative flex flex-col rounded-xl">
        <div className="flex items-center justify-between border-b border-(--border) p-4">
          <h3 className="text-base font-semibold sm:text-lg md:text-xl uppercase leading-none">
            <OutsideLink href={readMeUrl} className="flex items-center gap-2">
              <ReadMeSvg />
              <span>README</span>
            </OutsideLink>
          </h3>
          <ReadMeOutline content={content} />
        </div>
        <MyMarkdown className="text-sm md:text-base p-6 lg:p-8">
          {transformMarkdownLinks(content, repo)}
        </MyMarkdown>
      </div>
    </div>
  );
};
