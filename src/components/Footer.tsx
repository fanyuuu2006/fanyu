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
import { routes } from "./routes";

type FooterContent = Record<
  | "copyright"
  | "sourceCode"
  | "backToTop"
  | "quickLinks"
  | "builtWith",
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
        builtWith: "技術棧",
      },
      english: {
        copyright: " All rights reserved.",
        sourceCode: "Source Code",
        backToTop: "Back to top",
        quickLinks: "Quick Links",
        builtWith: "Built With",
      },
    } as LanguageContent<FooterContent>
  )[language]);

export const Footer = () => {
  const Language = useLanguage();
  const footerContent = getFooterContent(Language.Current);
  const year = new Date().getFullYear();

  // 技術棧
  const techStack = [
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "React 19",
    "Vercel",
  ];

  return (
    <footer className="w-full bg-black border-[var(--border-color)] border-t-1">
      <div className="container px-6 py-12">
        {/* 左側內容區域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
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
              {[
                {
                  label: {
                    chinese: "返回頂部",
                    english: "Back to top",
                  },
                  url: "#top",
                  icon: RocketOutlined,
                },
                ...routes,
              ].map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="flex items-center gap-2 text-[var(--text-color-muted)] hover:text-[var(--text-color-primary)] transition-colors duration-200"
                  >
                    {link.icon && <link.icon className="text-sm" />}
                    {link.label[Language.Current]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-md font-medium text-[var(--text-color)] mb-3">
              {footerContent.builtWith}
            </h5>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-[var(--background-color-tertiary)] text-[var(--text-color-muted)] rounded border border-[var(--border-color)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
