"use client";
import { MyImage } from "@/components/MyImage";
import { PortfolioItem } from "@/types";
import { getGithubBadgeSrcs } from "@/utils/github";
import { useMemo } from "react";

type GitHubBadgeDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};
export const GitHubBadgeDiv = ({
  className,
  item,
  ...rest
}: GitHubBadgeDivProps) => {
  const badges = useMemo(() => {
    return item.github?.repo ? getGithubBadgeSrcs(item.github.repo) : [];
  }, [item]);
  if (badges.length === 0) return null;

  return (
    <div className={className} {...rest}>
      {badges.map(({ title, url }) => (
        <MyImage key={title} src={url} alt={title} className="h-[1em]" />
      ))}
    </div>
  );
};
