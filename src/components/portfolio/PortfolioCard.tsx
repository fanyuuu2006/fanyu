import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { MyImage } from "../MyImage";
import { slugify } from "@/utils/url";
import Link from "next/link";
import ClockOutlinedSvg from "../svgs/ClockOutlinedSvg";
import RightOutlinedSvg from "../svgs/RightOutlinedSvg";

type PortfolioCardProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
  activeTags: Set<string>;
};

export const PortfolioCard = ({
  className,
  item,
  activeTags,
  ...rest
}: PortfolioCardProps) => {
  const cardId = slugify(item.title);
  const href = `/portfolio/${cardId}`;

  // 先用單次掃描把符合目前篩選條件的標籤排到最前面，
  // 再維持原始順序補上其他標籤，避免用排序與反覆 index 查找。
  const prioritizedTags: string[] = [];
  const fallbackTags: string[] = [];

  for (const tag of item.tags) {
    if (activeTags.has(tag)) {
      prioritizedTags.push(tag);
    } else {
      fallbackTags.push(tag);
    }
  }

  const highlightTags = [...prioritizedTags, ...fallbackTags].slice(0, 4);
  const extraTagCount = Math.max(0, item.tags.length - highlightTags.length);

  return (
    <div id={cardId} className={cn(className)} {...rest}>
      <Link
        href={href}
        // 整張卡片都是可點擊區域，並提供明確的 hover 與 focus 狀態。
        className="group flex w-full gap-4 rounded-2xl p-4 transition-all duration-300"
      >
        {/* 專案縮圖，用較小的視覺成本先辨識作品。 */}
        <div className="relative shrink-0 size-14 overflow-hidden rounded-2xl card md:size-16">
          <MyImage
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* 漸層遮罩效果，增加圖片的視覺層次感 */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/10" />
        </div>

        {/* 主要資訊區：標題、日期、摘要與重點標籤。 */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            {/* 標題與日期保留在同一塊，方便快速掃描。 */}
            <div className="min-w-0 space-y-1">
              <h4 className="truncate text-lg font-semibold text-(--foreground) sm:text-xl">
                {item.title}
              </h4>

              {/* 目前只保留最有辨識度的日期資訊，避免卡片塞入過多雜訊。 */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--muted)">
                <span className="flex items-center gap-1 font-mono">
                  <ClockOutlinedSvg aria-hidden />
                  <time dateTime={item.date}>{item.date}</time>
                </span>
              </div>
            </div>
          </div>

          {/* 摘要維持三行上限，兼顧瀏覽速度與內容可讀性。 */}
          <p className="text-sm leading-7 text-(--muted) line-clamp-3">
            {item.overview}
          </p>

          {/* 標籤區優先顯示目前篩選命中的標籤，再補上其他相關標籤。 */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {highlightTags.map((tag) => (
                <Tag key={tag} tag={tag} isActive={activeTags.has(tag)} />
              ))}
              {extraTagCount > 0 && (
                <Tag
                  tag={`+${extraTagCount}`}
                  className="opacity-60"
                  isActive={false}
                />
              )}
            </div>
          )}
        </div>

        {/* 結尾箭頭保留作為點擊暗示，不再額外放文字 CTA。 */}
        <div className="self-center shrink-0 text-base text-(--muted) opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <RightOutlinedSvg aria-hidden />
        </div>
      </Link>
    </div>
  );
};

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  tag: string;
  isActive: boolean;
};

// 小型標籤元件，統一處理外觀與 active 狀態。
const Tag = ({ tag, isActive, className, ...rest }: TagProps) => {
  return (
    <span
      className={cn(
        "card rounded-full px-2.5 py-1 text-xs font-mono transition-all duration-200",
        {
          "border-(--primary) text-(--primary)": isActive,
        },
        className,
      )}
      {...rest}
    >
      {tag}
    </span>
  );
};
