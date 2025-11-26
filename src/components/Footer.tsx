"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/libs/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  CodeOutlined,
  CopyrightOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";
import { getGithubBadgeSrcs } from "../utils/github";
import Link from "next/link";
import { Route, routes } from "./routes";
import { useMemo } from "react";

type FooterContent = Record<
  "copyright" | "sourceCode" | "backToTop" | "quickLinks",
  string
>;

const getFooterContent = (language: LanguageOption): FooterContent =>
  ((
    {
      chinese: {
        copyright: "版權所有。",
        sourceCode: "原始碼",
        backToTop: "返回頂部",
        quickLinks: "快速連結",
      },
      english: {
        copyright: " All rights reserved.",
        sourceCode: "Source Code",
        backToTop: "Back to top",
        quickLinks: "Quick Links",
      },
    } as LanguageContent<FooterContent>
  )[language]);

export const Footer = () => {
  const Language = useLanguage();
  const footerContent = getFooterContent(Language.Current);
  const year = new Date().getFullYear();
  const fastLinks: Route[] = useMemo(
    () => [
      {
        label: {
          chinese: "返回頂部",
          english: "Back to top",
        },
        url: "#top",
        icon: RocketOutlined,
      },
      ...routes,
    ],
    []
  );
  return (
    <footer className="w-full bg-black border-[var(--border-color)] border-t-1">
      <div className="container px-6 py-12">
        {/* 左側內容區域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-base md:text-lg flex flex-col gap-2 text-[var(--text-color-muted)]">
              <div className="flex gap-2">
                <CopyrightOutlined /> {year},{" "}
                {profile.nickname[Language.Current]}
                {footerContent.copyright}
              </div>
              <div className="flex flex-wrap items-center gap-x-2">
                <CodeOutlined /> {footerContent.sourceCode}
                <OutsideLink
                  className="whitespace-nowrap hover:underline"
                  href="https://github.com/fanyuuu2006/fanyu"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {getGithubBadgeSrcs("fanyuuu2006/fanyu").map((item) => (
                  /* eslint-disable-next-line @next/next/no-img-element*/
                  <img
                    draggable={false}
                    key={item.title}
                    src={item.url}
                    alt={`GitHub badge: ${item.title}`}
                    title={item.title}
                    className="h-[1em] select-none"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 快速連結 */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--text-color)] mb-4">
              {footerContent.quickLinks}
            </h4>
            <ul className="space-y-2">
              {fastLinks.map((link) => {
                if (link.hidden?.footer) return null;
                return (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="w-fit flex items-center gap-2 text-[var(--text-color-muted)] hover:text-[var(--text-color-primary)] transition-colors duration-200"
                    >
                      {link.icon && <link.icon className="text-sm" />}
                      {link.label[Language.Current]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
