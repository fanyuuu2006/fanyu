import Link from "next/link";
import { cn } from "@/utils/className";
import { BlogPost } from "@/types/blog";
import ArrowLeftOutlinedSvg from "@/components/svgs/ArrowLeftOutlinedSvg";
import ArrowRightOutlinedSvg from "@/components/svgs/ArrowRightOutlinedSvg";

type NavDirection = "prev" | "next";

const DIRECTION_META: Record<
  NavDirection,
  {
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    align: string;
  }
> = {
  prev: {
    label: "上一篇",
    Icon: ArrowLeftOutlinedSvg,
    align: "items-start text-left",
  },
  next: {
    label: "下一篇",
    Icon: ArrowRightOutlinedSvg,
    align: "items-end text-right",
  },
};

const itemBaseClassName =
  "card flex min-w-0 flex-col justify-center gap-1 rounded-lg border p-4 sm:min-h-28";

const itemDisabledClassName = "cursor-not-allowed opacity-50";

type BlogNavigationItemProps = {
  direction: NavDirection;
  post: BlogPost | null;
};

const BlogNavigationItem = ({ direction, post }: BlogNavigationItemProps) => {
  const { label, Icon, align } = DIRECTION_META[direction];

  const content = (
    <>
      <div
        className={cn(
          "flex items-center gap-1 text-sm font-semibold text-(--muted)",
          {
            "flex-row-reverse": direction === "next",
          },
        )}
      >
        <Icon
          className={cn("size-4 shrink-0 transition-transform duration-200")}
          aria-hidden
        />
        <span>{label}</span>
      </div>
      <div className="mt-1 line-clamp-2 wrap-break-word text-base font-bold">
        {post ? post.title : `沒有${label}了`}
      </div>
    </>
  );

  if (!post) {
    return (
      <div
        className={cn(itemBaseClassName, align, itemDisabledClassName)}
        aria-disabled="true"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(itemBaseClassName, align)}
      aria-label={`${label}文章：${post.title}`}
    >
      {content}
    </Link>
  );
};

type BlogNavigationProps = React.HTMLAttributes<HTMLElement> & {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
};

export const BlogNavigation = ({
  prevPost,
  nextPost,
  className,
  ...rest
}: BlogNavigationProps) => {
  return (
    <nav
      aria-label="文章導覽"
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4",
        className,
      )}
      {...rest}
    >
      <BlogNavigationItem direction="prev" post={prevPost} />
      <BlogNavigationItem direction="next" post={nextPost} />
    </nav>
  );
};
