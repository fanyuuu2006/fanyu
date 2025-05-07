"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { CodeOutlined, CopyrightOutlined } from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";

type FooterContent = Record<"copyright" | "sourceCode", string>;

const getFooterContent = (language: LanguageOption): FooterContent =>
  ((
    {
      chinese: {
        copyright: "版權所有。",
        sourceCode: "原始碼: ",
      },
      english: {
        copyright: " All rights reserved.",
        sourceCode: "Source code: ",
      },
    } as LanguageContent<FooterContent>
  )[language]);

const githubBadgeItems: {
  title: string;
  href: string;
}[] = [
  {
    title: "License",
    href: "https://img.shields.io/github/license/fanyuuu2006/fanyu?style=flat-square",
  },
  {
    title: "Stars",
    href: "https://img.shields.io/github/stars/fanyuuu2006/fanyu?style=flat-square",
  },
  {
    title: "Last commit",
    href: "https://img.shields.io/github/last-commit/fanyuuu2006/fanyu?style=flat-square",
  },
  {
    title: "Created at",
    href: "https://img.shields.io/github/created-at/fanyuuu2006/fanyu?style=flat-square",
  },
  {
    title: "Repository size",
    href: "https://img.shields.io/github/repo-size/fanyuuu2006/fanyu?style=flat-square",
  },
];

export const Footer = () => {
  const Langauge = useLanguage();
  const footerContent = getFooterContent(Langauge.Current);
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container flex flex-col items-center">
        <div className="hint flex flex-col gap-2">
          <div className="flex gap-2">
            <CopyrightOutlined /> {year}, {profile.nickname[Langauge.Current]}
            {footerContent.copyright}
          </div>
          <div className="flex flex-wrap items-center gap-x-2">
            <CodeOutlined /> {footerContent.sourceCode}
            <OutsideLink
              className="whitespace-nowrap"
              href="https://github.com/fanyuuu2006/fanyu"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {githubBadgeItems.map((item) => (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  key={item.title}
                  src={item.href}
                  alt={item.title}
                  title={item.title}
                  className="h-fit"
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
