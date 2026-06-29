"use client";
import { CustomLink } from "@/components/CustomLink";
import { MyImage } from "@/components/MyImage";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { getGithubBadgeSrcs } from "@/utils/github";
import {
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import { DivTitle } from "./DivTitle";

type MetaDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};
export const MetaDiv = ({ className, item, ...rest }: MetaDivProps) => {
  const badges = useMemo(() => {
    return item.github?.repo ? getGithubBadgeSrcs(item.github.repo) : [];
  }, [item]);

  const links = useMemo(
    () => [
      ...item.links.map((link) => ({ ...link, icon: LinkOutlined })),
      ...(item.github
        ? [
            {
              label: "GitHub",
              url: `https://github.com/${item.github.repo}`,
              icon: GithubOutlined,
            },
          ]
        : []),
    ],
    [item],
  );

  return (
    <div className={cn("flex flex-col gap-3", className)} {...rest}>
      <DivTitle>作品資訊</DivTitle>
      <div className="flex flex-col p-2 gap-2 text-sm sm:text-base text-(--muted)">
        <div className="flex items-center gap-1.5">
          <ClockCircleOutlined aria-hidden />
          <time dateTime={item.date}>{item.date}</time>
        </div>
        {links.length > 0 && 
            links.map((link) => (
              <CustomLink
                key={link.url}
                href={link.url}
                className="flex items-center gap-1.5 text-(--muted) hover:text-(--primary) transition-colors"
              >
                <link.icon aria-hidden />
                {link.label}
              </CustomLink>
            ))
        }
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map(({ title, url }) => (
              <MyImage key={title} src={url} alt={title} className="h-4" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
