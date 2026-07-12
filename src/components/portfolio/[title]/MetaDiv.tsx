import { CustomLink } from "@/components/CustomLink";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { toISODateTime } from "@/utils/date";
import { DivTitle } from "./DivTitle";
import { GitHubLanguagesDiv } from "./GithubLanguagesDiv";
import LinkOutlinedSvg from "@/components/svgs/LinkOutlinedSvg";
import GithubSvg from "@/components/svgs/GithubSvg";
import ClockOutlinedSvg from "@/components/svgs/ClockOutlinedSvg";

export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  if (!year) return date;
  if (!month) return `${year} 年`;
  if (!day) return `${year} 年 ${month} 月`;
  return `${year} 年 ${month} 月 ${day} 日`;
};
type MetaDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};

export const MetaDiv = ({ className, item, ...rest }: MetaDivProps) => {
  const links = [
    ...item.links.map((link) => ({ ...link, icon: LinkOutlinedSvg })),
    ...(item.github
      ? [
          {
            label: item.github.repo,
            url: `https://github.com/${item.github.repo}`,
            icon: GithubSvg,
          },
        ]
      : []),
  ];
  return (
    <div className={cn("flex-col gap-3", className)} {...rest}>
      <div className="flex flex-col gap-2">
        <DivTitle>關於</DivTitle>
        <div className="flex flex-col p-2 gap-2 text-sm sm:text-base text-(--muted)">
          <div className="flex items-center gap-1.5">
            <ClockOutlinedSvg aria-hidden />
            <time dateTime={toISODateTime(item.date)}>
              {formatDate(item.date)}
            </time>
          </div>

          {links.map((link) => (
            <CustomLink
              key={`${link.label}-${link.url}`}
              href={link.url}
              className="flex items-center gap-1.5 truncate text-(--muted) hover:text-(--primary) transition-colors"
            >
              <link.icon aria-hidden className="shrink-0" />
              <span className="truncate">{link.label}</span>
            </CustomLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <DivTitle>語言</DivTitle>
        <GitHubLanguagesDiv item={item} className="p-2" />
      </div>
    </div>
  );
};
