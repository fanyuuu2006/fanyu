"use client";
import { useLanguage } from "@/context/LanguageContext";
import { portfolio, portfolioTagCategories } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  PortfolioItem,
  PortfolioTag,
  PortfolioTagCategory,
} from "@/types/portfolio";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioTagButton } from "./PortfolioTagButton";

type PortfolioContent = Record<
  "portfolio" | "nofound" | "all" | "categories" | PortfolioTagCategory,
  string
>;

const getPortfolioContent = (language: LanguageOption): PortfolioContent =>
  ((
    {
      chinese: {
        portfolio: "作品集",
        all: "全部",
        nofound: "暫無符合條件的作品",
        categories: "類別",
        language: "語言",
        roles: "開發角色",
        domains: "領域",
        frameworks: "框架",
        libraries: "函式庫",
        tools: "工具",
        other: "其他／雜項",
      },
      english: {
        portfolio: "Portfolio",
        all: "All",
        nofound: "No matching portfolio found",
        categories: "Categories",
        language: "Language",
        roles: "Development Role",
        domains: "Domain Expertise",
        frameworks: "Frameworks",
        libraries: "Libraries",
        tools: "Tools",
        other: "Other / Miscellaneous",
      },
    } as LanguageContent<PortfolioContent>
  )[language]);

export const PortfolioSection = () => {
  const Language = useLanguage();
  const portfolioContent = getPortfolioContent(Language.Current);
  const [currentTag, setCurrentTag] = useState<PortfolioTag | null>(null);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  useState<PortfolioItem[]>(portfolio);
  const categoryContentRef = useRef<HTMLDivElement>(null);

  const filteredPortfolio = useMemo(() => {
    return !currentTag
      ? portfolio
      : portfolio.filter((item) => item.tags.includes(currentTag));
  }, [currentTag]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{portfolioContent.portfolio}</div>
        <div className="note flex flex-col w-full px-4 gap-2">
          <button
            onClick={() => {
              setShowCategory((prev) => !prev);
            }}
            className="btn-text flex items-center w-fit gap-2"
          >
            {portfolioContent.categories}
            {showCategory ? <DownOutlined /> : <MenuOutlined />}
          </button>

          <div
            className="slide-toggle-wrapper"
            style={{
              maxHeight: `${
                showCategory ? categoryContentRef.current?.scrollHeight : 0
              }px`,
            }}
          >
            <div ref={categoryContentRef} className="flex flex-col ms-2 gap-2">
              <div>
                <PortfolioTagButton
                  tag={null}
                  currentTag={currentTag}
                  setCurrentTag={setCurrentTag}
                  setShowCategory={setShowCategory}
                >
                  {portfolioContent.all}
                </PortfolioTagButton>
              </div>
              {Object.entries(portfolioTagCategories).map(
                ([category, tags]) => (
                  <div key={category} className="flex flex-col gap-2">
                    <span className="font-bold">
                      {portfolioContent[category as keyof PortfolioContent]}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <PortfolioTagButton
                          key={tag}
                          tag={tag}
                          currentTag={currentTag}
                          setCurrentTag={setCurrentTag}
                          setShowCategory={setShowCategory}
                        >
                          {tag}
                        </PortfolioTagButton>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {filteredPortfolio.length === 0 ? (
          <>{portfolioContent.nofound}</>
        ) : (
          filteredPortfolio.map((item: PortfolioItem) => (
            <PortfolioCard
              key={item.title.english}
              item={item}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              setShowCategory={setShowCategory}
            />
          ))
        )}
        <Link className="note" href="/#portfolio">
          返回
        </Link>
      </div>
    </section>
  );
};
