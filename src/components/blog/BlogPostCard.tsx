import { cn } from "@/utils/className";
import { MyImage } from "../MyImage";
import { slugify } from "@/utils/url";
import Link from "next/link";
import ClockOutlinedSvg from "../svgs/ClockOutlinedSvg";
import RightOutlinedSvg from "../svgs/RightOutlinedSvg";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/utils/date";

type BlogPostCardProps = React.HTMLAttributes<HTMLDivElement> & {
  post: BlogPost;
};

export const BlogPostCard = ({
  className,
  post,
  ...rest
}: BlogPostCardProps) => {
  const cardId = slugify(post.slug);
  const href = `/blog/${cardId}`;

  const displayedTags = [...post.tags].slice(0, 4);
  const extraTagCount = Math.max(0, post.tags.length - displayedTags.length);

  return (
    <div id={cardId} className={cn(className)} {...rest}>
      <Link
        href={href}
        // 手機版縮圖與文字上下排列，桌面版改為左圖右文，避免小螢幕擠壓過度。
        className="card group flex w-full flex-col gap-4 rounded-2xl p-4 transition-all duration-300 sm:flex-row"
      >
        {/* 封面縮圖 */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl sm:w-44">
          <MyImage
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/10" />
        </div>

        {/* 文字內容 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3
              className="line-clamp-1 text-lg font-semibold text-(--foreground) sm:text-xl"
              title={post.title}
            >
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-7 text-(--muted) sm:line-clamp-3">
              {post.overview}
            </p>
          </div>

          {displayedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {displayedTags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
              {extraTagCount > 0 && (
                <Tag tag={`+${extraTagCount}`} className="opacity-60" />
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-(--muted)">
              <span className="flex items-center gap-1">
                <ClockOutlinedSvg aria-hidden />
                <time dateTime={String(post.date)}>
                  {formatDate("YYYY 年 MM 月 DD 日", post.date)}
                </time>
              </span>
              <span className="text-(--muted)">•</span>
              <span>{post.readingTime} 分鐘閱讀</span>
            </div>

            {/* 箭頭改為 hover 才滑入顯示，與 PortfolioCard 的互動語言一致 */}
            <div className="shrink-0 -translate-x-1 text-base text-(--muted) opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <RightOutlinedSvg aria-hidden />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  tag: string;
};

// 小型標籤元件，統一處理外觀與 active 狀態。
const Tag = ({ tag, className, ...rest }: TagProps) => {
  return (
    <span
      className={cn(
        "card rounded-full px-2.5 py-1 text-xs font-mono transition-all duration-200",
        className,
      )}
      {...rest}
    >
      {tag}
    </span>
  );
};
