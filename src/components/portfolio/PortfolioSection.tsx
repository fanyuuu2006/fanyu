"use client";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioTagCategories } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  PortfolioItem,
  PortfolioTag,
  PortfolioTagCategory,
} from "@/types/portfolio";
import {
  ArrowLeftOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioTagButton } from "./PortfolioTagButton";
import { profile } from "../../lib/profile";
import { Collapse } from "../common/Collapse";
type PortfolioContent = Record<
  | "portfolio"
  | "nofound"
  | "all"
  | "categories"
  | "back"
  | "count"
  | PortfolioTagCategory,
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
        back: "返回",
        count: "共 {count} 筆",
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
        back: "Back",
        count: "Total: {count}",
      },
    } as LanguageContent<PortfolioContent>
  )[language]);

export const PortfolioSection = () => {
  const Language = useLanguage();
  const portfolioContent = getPortfolioContent(Language.Current);

  const [categoriesShow, setCategoriesShow] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<PortfolioTag | null>(null);

  const filteredPortfolio = useMemo(() => {
    return !currentTag
      ? profile.portfolio
      : profile.portfolio.filter((item) => item.tags.includes(currentTag));
  }, [currentTag]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{portfolioContent.portfolio}</div>
        <div className="note flex flex-col w-full gap-2">
          <div className="relative flex flex-nowrap px-4 gap-4 justify-between">
            <button
              onClick={() => {
                setCategoriesShow((prev) => !prev);
              }}
              className="btn-text flex items-center w-fit gap-2"
            >
              {portfolioContent.categories}
              {categoriesShow ? <DownOutlined /> : <MenuOutlined />}
            </button>
            <span>
              {portfolioContent.count.replace(
                "{count}",
                filteredPortfolio.length.toString()
              )}
            </span>
          </div>
          <Collapse className="absolute z-10 mt-8" state={categoriesShow}>
            <div className="flex flex-col p-4 gap-2 card bordered">
              <div>
                <PortfolioTagButton
                  tag={null}
                  currentTag={currentTag}
                  setCurrentTag={setCurrentTag}
                  setCategoriesShow={setCategoriesShow}
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
                          setCategoriesShow={setCategoriesShow}
                        >
                          {tag}
                        </PortfolioTagButton>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </Collapse>
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
              setCategoriesShow={setCategoriesShow}
            />
          ))
        )}
        <Link className="note" href="/#portfolio">
          <ArrowLeftOutlined /> {portfolioContent.back}
        </Link>
      </div>
    </section>
  );
};
