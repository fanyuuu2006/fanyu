"use client";
import Link from "next/link";
import { OutsideLink } from "fanyucomponents";
import { cn } from "@/utils/className";
import { LogoSvg } from "./LogoSvg";
import { site } from "@/libs/site";
import { routes } from "@/libs/routes";
import { MyImage } from "./MyImage";
import { getGithubBadgeSrcs } from "@/utils/github";
import { AnalyticsInfo, MyResponse } from "@/types";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/url";

const formatNumber = (value?: number) => {
  if (value == null) return "--";
  return value.toLocaleString();
};

type FooterProps = React.HTMLAttributes<HTMLElement>;

export const Footer = ({ className, ...rest }: FooterProps) => {
  const [info, setInfo] = useState<AnalyticsInfo | null>(null);
  useEffect(() => {
    fetcher<MyResponse<AnalyticsInfo>>("/api/v1/analytics").then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setInfo(data.data);
      }
    });
  }, []);
  return (
    <footer
      {...rest}
      className={cn(
        "text-(--muted) border-t-2 border-(--border) bg-(--background)",
        className,
      )}
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] py-8">
          <div className="space-y-5">
            <LogoSvg role="banner" className="h-16 text-(--foreground)" />

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-(--foreground)">
                {site.title}
              </h2>

              <p className="max-w-lg text-sm leading-6">{site.description}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <span>
                原始碼：
                <OutsideLink
                  href="https://github.com/fanyuuu2006/fanyu"
                  className="hover:underline"
                />
              </span>
              <div className="flex flex-wrap gap-2">
                {getGithubBadgeSrcs("fanyuuu2006/fanyu").map((badge) => (
                  <MyImage
                    key={badge.title}
                    src={badge.url}
                    alt={badge.title}
                    className="h-[1.15rem]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <H3>快速連結</H3>

            <ul className="space-y-2 text-xs md:text-sm">
              {routes.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="
                      transition-colors
                      hover:text-(--foreground)
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <H3>統計資訊</H3>
              <div className="text-xs md:text-sm flex flex-col gap-2">
                {[
                  {
                    value: info?.total.visitors,
                    label: "總訪客數",
                  },
                  {
                    value: info?.monthly.visitors,
                    label: "本月訪客數",
                  },
                  {
                    value: info?.total.pageViews,
                    label: "總瀏覽量",
                  },
                ].map((item) => (
                  <div key={item.label} className=" flex items-center gap-2">
                    <span>{item.label}:</span>
                    <span>{formatNumber(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            gap-2
            border-t
            border-(--border)
            pt-6
            text-sm
           
            md:flex-row
            md:justify-between
          "
        >
          <span>© {new Date().getFullYear()} FanYu. All rights reserved.</span>

          <span>Made with Next.js By FanYu</span>
        </div>
      </div>
    </footer>
  );
};

const H3 = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        `mb-4 text-sm md:text-base font-semibold text-(--foreground)`,
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
};
