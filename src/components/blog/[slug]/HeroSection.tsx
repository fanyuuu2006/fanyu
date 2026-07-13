import { cn } from "@/utils/className";
import { BackDiv } from "@/components/BackDiv";
import { MyImage } from "@/components/MyImage";
import { BlogPost } from "@/types/blog";
import ClockOutlinedSvg from "@/components/svgs/ClockOutlinedSvg";
import CalendarOutlinedSvg from "@/components/svgs/CalendarOutlinedSvg";
import { formatDate } from "@/utils/date";

type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
  post: BlogPost;
};

export const HeroSection = ({
  post,
  className,
  ...props
}: HeroSectionProps) => {
  const formattedDate = formatDate("YYYY年MM月DD日", post.date);

  return (
    <section id="hero" className={cn("mt-24", className)} {...props}>
      <div className="container flex flex-col gap-4 sm:gap-5">
        {/* Back */}
        <BackDiv />

        {/* 標題 */}
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* 摘要 */}
        {post.overview && (
          <p className="max-w-3xl text-sm leading-6 text-(--muted) sm:text-base sm:leading-7 md:text-lg">
            {post.overview}
          </p>
        )}

        {/* Meta：日期 / 閱讀時間 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-(--muted) sm:gap-x-5 sm:text-sm">
          <span className="flex items-center gap-1.5 font-mono">
            <CalendarOutlinedSvg aria-hidden />
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span className="flex items-center gap-1.5 font-mono">
            <ClockOutlinedSvg aria-hidden />約 {post.readingTime} 分鐘閱讀
          </span>
        </div>
        {/* 標籤 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="card rounded-full px-2.5 py-1 text-xs font-mono transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 封面圖 */}
        <MyImage
          src={post.image}
          alt={post.title}
          className="relative mx-auto mt-2 max-h-112 max-w-full rounded-2xl object-contain"
        />
      </div>
    </section>
  );
};
