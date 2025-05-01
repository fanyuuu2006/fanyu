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
      <div className="container d-flex flex-column align-items-center">
        <div className="title text-bold">{portfolioContent.portfolio}</div>
        <div
          className="note d-flex flex-column"
          style={{
            width: "100%",
            padding: "0 1em",
            gap: "0.5em",
          }}
        >
          <button
            onClick={() => {
              setShowCategory((prev) => !prev);
            }}
            className="btn-text d-flex align-items-center"
            style={{ width:"contain", gap: "0.5em" }}
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
            <div
              ref={categoryContentRef}
              className="d-flex flex-column"
              style={{ gap: "0.5em", }}
            >
              <div>
                <button
                  onClick={() => {
                    setCurrentTag(null);
                    setShowCategory(false);
                  }}
                  className={`btn card-link ${!currentTag ? "active" : ""}`}
                  style={{
                    padding: "0 0.5em",
                    borderRadius: "5px",
                  }}
                >
                  {portfolioContent.all}
                </button>
              </div>
              {Object.entries(portfolioTagCategories).map(
                ([category, tags]) => (
                  <div
                    key={category}
                    className="d-flex flex-column"
                    style={{ gap: "0.5em" }}
                  >
                    <span className="text-bold">
                      {portfolioContent[category as keyof PortfolioContent]}
                    </span>
                    <div className="d-flex" style={{ gap: "0.5em" }}>
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setCurrentTag(tag);
                            setShowCategory(false);
                          }}
                          className={`btn card-link ${
                            tag === currentTag ? "active" : ""
                          }`}
                          style={{
                            padding: "0 0.5em",
                            borderRadius: "5px",
                          }}
                        >
                          {tag}
                        </button>
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
            <PortfolioCard key={item.title.english} item={item} />
          ))
        )}
        <Link className="note" href="/#portfolio">
          返回
        </Link>
      </div>
    </section>
  );
};
