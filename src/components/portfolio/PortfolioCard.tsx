"use client";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { RightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { MyImage } from "../MyImage";
import { slugify } from "@/utils/url";
import Link from "next/link";
import { HTMLMotionProps, motion } from "framer-motion";
import { fadeInItem } from "@/libs/motion";

type PortfolioCardProps = HTMLMotionProps<"article"> & {
  item: PortfolioItem;
  activeTags: Set<string>;
};

export const PortfolioCard = ({
  className,
  item,
  activeTags,
  ...rest
}: PortfolioCardProps) => {
  const href = `/portfolio/${slugify(item.title)}`;

  return (
    <motion.article
      id={slugify(item.title)}
      variants={fadeInItem}
      className={cn("py-7 first:pt-0 last:pb-0", className)}
      {...rest}
    >
      <Link href={href} className="group flex items-start gap-4 w-full">
        <div className="shrink-0 size-12 md:size-14 rounded-lg overflow-hidden">
          <MyImage
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-(--foreground)">
              {item.title}
            </h4>
            <p className="text-sm text-(--muted) font-mono flex items-center gap-1 shrink-0">
              <ClockCircleOutlined aria-hidden />
              <time dateTime={item.date}>{item.date}</time>
            </p>
          </div>

          <p className="text-(--muted) text-sm leading-relaxed line-clamp-2">
            {item.overview}
          </p>

          {item.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "card primary text-xs font-mono rounded-full px-2 py-1 transition-colors duration-200",
                    activeTags.has(tag) &&
                      "border-(--primary) text-(--primary)",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="self-center shrink-0 text-base text-(--muted) opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <RightOutlined aria-hidden />
        </div>
      </Link>
    </motion.article>
  );
};
