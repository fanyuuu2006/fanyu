import { CustomLink } from "@/components/CustomLink";
import { MyImage } from "@/components/MyImage";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { GitHubBadgeDiv } from "./GitHubBadgeDiv";
import GithubSvg from "@/components/svgs/GithubSvg";
import { DemoOutlinedSvg } from "@/components/svgs/DemoOutlinedSvg";
import { BackDiv } from "./BackDiv";

type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
  item: PortfolioItem;
};

export const HeroSection = ({
  item,
  className,
  ...props
}: HeroSectionProps) => {
  const links = [
    ...item.links.map((link) => ({
      ...link,
      className: "btn primary",
      icon: DemoOutlinedSvg,
    })),
    ...(item.github
      ? [
          {
            label: "GitHub",
            url: `https://github.com/${item.github.repo}`,
            icon: GithubSvg,
            className: "btn secondary",
          },
        ]
      : []),
  ];

  return (
    <section id="hero" className={cn("mt-32", className)} {...props}>
      <div className="container flex flex-col gap-5">
        {/* Back */}
        <BackDiv />

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
            <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
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
                    className="card rounded-full px-2.5 py-1 text-xs font-mono transition-all duration-200"
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
        <GitHubBadgeDiv
          className="text-base flex items-center justify-center flex-wrap gap-2 md:text-lg lg:text-xl"
          item={item}
        />
      </div>
    </section>
  );
};
