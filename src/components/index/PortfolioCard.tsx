import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { MyImage } from "../MyImage";
import { CustomLink } from "../CustomLink";
import { slugify } from "@/utils/url";
import { DemoOutlinedSvg } from "../svgs/DemoOutlinedSvg";
import "@/styles/portfolio-card.css";
import InfoCircleOutlinedSvg from "../svgs/InfoCircleOutlinedSvg";
import CalendarOutlinedSvg from "../svgs/CalendarOutlinedSvg";

type PortfolioCardProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};

export const PortfolioCard = ({
  className,
  item,
  ...rest
}: PortfolioCardProps) => {
  const viewUrl = item.links[0]?.url;
  const infoUrl = `/portfolio/${slugify(item.title)}`;

  return (
    <div className={cn(`card portfolio-card rounded-xl`, className)} {...rest}>
      <MyImage
        draggable={false}
        src={item.imageUrl}
        className="portfolio-card__image"
        alt={item.title}
      />
      <div className="portfolio-card__content">
        <div className="text-white relative flex flex-col justify-between w-full h-full p-4">
          {/* 主要內容區域 */}
          <div className="flex flex-col gap-0.5">
            <h3
              title={item.title}
              className="text-base sm:text-lg font-extrabold leading-tight truncate"
            >
              {item.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-(--muted)">
              <CalendarOutlinedSvg />
              <time dateTime={item.date}>{item.date}</time>
            </div>
            <div className="mt-0.5 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
              {item.overview}
            </div>
          </div>

          {/* 按鈕區域 */}
          <div className="flex justify-end gap-1.5 text-base sm:text-lg mt-2">
            {[
              {
                tooltip: item.links[0]?.label ?? "查看作品",
                icon: DemoOutlinedSvg,
                href: viewUrl,
                className: "btn primary",
              },
              {
                tooltip: "詳情",
                icon: InfoCircleOutlinedSvg,
                href: infoUrl,
                className: "btn secondary",
              },
            ].map((link) => (
              <CustomLink key={link.tooltip} href={link.href}>
                <div
                  data-tooltip={link.tooltip}
                  className={cn(
                    `tooltip p-2 rounded-full flex items-center justify-center`,
                    link.className,
                  )}
                >
                  <link.icon />
                </div>
              </CustomLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
