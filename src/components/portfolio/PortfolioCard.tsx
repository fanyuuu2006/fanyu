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
};

export const PortfolioCard = ({
  className,
  item,
  ...rest
}: PortfolioCardProps) => {
  const href = `/portfolio/${slugify(item.title)}`;
  return (
    <motion.article
      variants={fadeInItem}
      className={cn("py-7 first:pt-0 last:pb-0", className)}
      {...rest}
    >
      <Link href={href} className="w-full">
        <div className="group relative flex items-start gap-4">
          <div className="shrink-0 size-12 md:size-14 rounded-lg overflow-hidden bg-(--foreground)">
            <MyImage
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-(--foreground)">
                  {item.title}
                </h4>
                <p className="text-sm text-(--muted) font-mono flex items-center gap-1">
                  <ClockCircleOutlined />
                  <span>{item.date}</span>
                </p>
              </div>
              <p className="text-(--muted) text-sm">{item.overview}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="card primary text-xs sm:text-sm font-mono rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 shrink-0 text-lg hidden transition-all duration-300 group-hover:block">
            <RightOutlined />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
