"use client";
import { CustomLink } from "@/components/CustomLink";
import { MyImage } from "@/components/MyImage";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { getGithubBadgeSrcs } from "@/utils/github";
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
  item: PortfolioItem;
};

export const HeroSection = ({
  item,
  className,
  ...props
}: HeroSectionProps) => {
  const router = useRouter();

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
    <section className={cn("mt-24", className)} {...props}>
      <div className="container flex flex-col gap-6">
        {/* Back */}
        <div className="flex">
          <button
            className="btn secondary flex items-center justify-center p-2 text-lg rounded-full"
            onClick={() => router.back()}
            aria-label="返回"
          >
            <ArrowLeftOutlined aria-hidden />
          </button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-6 md:gap-8 p-4">
          {/* Image */}
          <div className="border border-(--border) mx-auto md:mx-0 size-48 sm:size-56 md:size-64 shrink-0 rounded-xl overflow-hidden hover:border-(--primary) transition-all duration-300">
            <MyImage
              src={item.imageUrl}
              alt={item.title}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="drop-shadow-[0_0_1rem_var(--primary)] text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              {item.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm sm:text-base text-(--muted)">
              <ClockCircleOutlined aria-hidden />
              <time dateTime={item.date}>{item.date}</time>
            </div>
            <p className="mt-2 text-sm sm:text-base text-(--muted) leading-relaxed">
              {item.overview}
            </p>
            {item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="card primary text-xs font-mono rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {links.map((link) => (
                  <CustomLink
                    key={link.url}
                    href={link.url}
                    className="btn primary flex items-center gap-1.5 px-4 py-1.5 text-sm sm:text-base rounded-full"
                  >
                    <link.icon aria-hidden />
                    {link.label}
                  </CustomLink>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* GitHub Badges */}
        {item.github?.repo && (
          <div className="flex flex-wrap gap-2">
            {getGithubBadgeSrcs(item.github.repo).map(({ title, url }) => (
              <MyImage key={title} src={url} alt={title} className="h-5" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
