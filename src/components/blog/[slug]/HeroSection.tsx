import { cn } from "@/utils/className";
import { BackDiv } from "@/components/BackDiv";
import { MyImage } from "@/components/MyImage";
import { BlogPost } from "@/types/blog";
import ClockOutlinedSvg from "@/components/svgs/ClockOutlinedSvg";
import CalendarOutlinedSvg from "@/components/svgs/CalendarOutlinedSvg";

type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
  post: BlogPost;
};

export const HeroSection = ({
  post,
  className,
  ...props
}: HeroSectionProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="hero" className={cn("mt-32", className)} {...props}>
      <div className="container flex flex-col gap-5">
        {/* Back */}
        <BackDiv />

        {/* 標籤 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="card rounded-full px-2.5 py-1 text-xs font-mono transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 標題 */}
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        {/* 摘要 */}
        {post.overview && (
          <p className="max-w-3xl text-base leading-7 text-(--muted) sm:text-lg">
            {post.overview}
          </p>
        )}

        {/* Meta：日期 / 閱讀時間 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-(--muted)">
          <span className="flex items-center gap-1.5 font-mono">
            <CalendarOutlinedSvg aria-hidden />
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span className="flex items-center gap-1.5 font-mono">
            <ClockOutlinedSvg aria-hidden />約 {post.readingTime} 分鐘閱讀
          </span>
        </div>

        {/* 封面圖 */}
        <div className="relative mt-2 aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-xl">
          <MyImage
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/10" />
        </div>
      </div>
    </section>
  );
};
