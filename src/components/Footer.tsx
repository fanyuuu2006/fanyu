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
  url: string;
}[] = [
  {
    title: "License",
    url: "license",
  },
  {
    title: "Stars",
    url: "stars",
  },
  {
    title: "Last commit",
    url: "last-commit",
  },
  {
    title: "Created at",
    url: "created-at",
  },
  {
    title: "Repository size",
    url: "repo-size",
  },
];

export const Footer = () => {
  const Langauge = useLanguage();
  const footerContent = getFooterContent(Langauge.Current);
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container flex flex-col items-center">
        <div className="hint flex flex-col gap-2 text-[#aaa]">
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
                  src={`https://img.shields.io/github/${item.url}/fanyuuu2006/fanyu?style=flat-square`}
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
