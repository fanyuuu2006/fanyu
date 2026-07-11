import { MyMarkdown } from "@/components/MyMarkdown";
import { PortfolioItem } from "@/types";
import { getGithubReadMe, transformMarkdownLinks } from "@/utils/github";
import { OutsideLink } from "fanyucomponents";
import { cn } from "@/utils/className";
import { DivTitle } from "./DivTitle";
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
      <DivTitle>
        <OutsideLink href={readMeUrl} className="flex items-center gap-2">
          <ReadMeSvg />
          <span>README</span>
        </OutsideLink>
      </DivTitle>

      <div className="card flex flex-col rounded-xl p-6 lg:p-8">
        <ReadMeOutline
          className="sticky top-36 self-end z-99"
          content={content}
        />
        <MyMarkdown className="text-sm md:text-base">
          {transformMarkdownLinks(content, repo)}
        </MyMarkdown>
      </div>
    </div>
  );
};
