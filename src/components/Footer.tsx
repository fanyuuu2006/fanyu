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
        sourceCode: "原始碼",
      },
      english: {
        copyright: " All rights reserved.",
        sourceCode: "Source code",
      },
    } as LanguageContent<FooterContent>
  )[language]);

export const Footer = () => {
  const Langauge = useLanguage();
  const footerContent = getFooterContent(Langauge.Current);
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container flex flex-col items-center">
        <div className="note">
          <div className="flex gap-4">
            <CopyrightOutlined /> {year}, {profile.nickname[Langauge.Current]}
            {footerContent.copyright}
          </div>
          <div className="flex items-center gap-2">
            <CodeOutlined /> {footerContent.sourceCode}
            <span>
              {"["}
              <OutsideLink href="https://github.com/fanyuuu2006/fanyu" />
              {"]"}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src="https://img.shields.io/github/license/fanyuuu2006/fanyu"
              alt="license"
              className="h-fit"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
