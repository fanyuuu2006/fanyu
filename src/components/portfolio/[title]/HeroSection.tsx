"use client";
import { CustomLink } from "@/components/CustomLink";
import { DemoOutlined } from "@/components/DemoOutlined";
import { MyImage } from "@/components/MyImage";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { ArrowLeftOutlined, GithubOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { GitHubBadgeDiv } from "./GitHubBadgeDiv";

type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
  item: PortfolioItem;
};

export const HeroSection = ({
  item,
  className,
  ...props
}: HeroSectionProps) => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/portfolio");
    }
  }, [router]);

  const links = useMemo(
    () => [
      ...item.links.map((link) => ({
        ...link,
        className: "btn primary",
        icon: DemoOutlined,
      })),
      ...(item.github
        ? [
            {
              label: "GitHub",
              url: `https://github.com/${item.github.repo}`,
              icon: GithubOutlined,
              className: "btn secondary",
            },
          ]
        : []),
    ],
    [item],
  );

  return (
    <section className={cn("mt-32", className)} {...props}>
      <div className="container flex flex-col gap-5">
        {/* Back */}
        <div className="flex">
          <button
            className="btn flex items-center justify-center p-2.5 text-xl rounded-full"
            onClick={handleBackClick}
            aria-label="返回"
          >
            <ArrowLeftOutlined aria-hidden />
          </button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center md:items-start gap-6 md:gap-8 px-2 py-4">
          {/* Image */}
          <div className="card shrink-0 rounded-xl overflow-hidden mx-auto size-40 transition-all duration-300 md:mx-0 sm:size-48 md:size-56 lg:size-60">
            <MyImage
              src={item.imageUrl}
              alt={item.title}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3 min-w-0">
            <h2 className="drop-shadow-[0_0_1rem_var(--primary)] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              {item.title}
            </h2>
            <p className="text-(--muted) text-sm sm:text-base lg:text-lg leading-7">
              {item.overview}
            </p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="card primary text-xs sm:text-sm font-mono rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <CustomLink
                    key={link.url}
                    href={link.url}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 text-sm md:text-base rounded-xl",
                      link.className,
                    )}
                  >
                    <link.icon aria-hidden />
                    {link.label}
                  </CustomLink>
                ))}
              </div>
            )}
          </div>
        </div>
        <GitHubBadgeDiv className="text-base flex items-center justify-center flex-wrap gap-2 md:text-lg lg:text-xl" item={item} />
      </div>
    </section>
  );
};
