"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { portfolio, portfolioTagCategories } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  PortfolioItem,
  PortfolioLinkCategory,
  PortfolioTag,
  PortfolioTagCategory,
} from "@/types/portfolio";
import {
  ClockCircleOutlined,
  CodeSandboxOutlined,
  GithubOutlined,
  LinkOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { slugify } from "@/utils/url";

type PortfolioContent = Record<
  "portfolio" | "nofound" | "all" | PortfolioTagCategory,
  string
>;

const getPortfolioContent = (language: LanguageOption): PortfolioContent =>
  ((
    {
      chinese: {
        portfolio: "作品集",
        all: "全部",
        nofound: "暫無符合條件的作品",
        language: "語言",
        roles: "",
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

const categoryIcon: Record<PortfolioLinkCategory, React.ReactNode> = {
  demo: <LinkOutlined />,
  github: <GithubOutlined />,
  package: <CodeSandboxOutlined />,
};

export const PortfolioSection = () => {
  const Language = useLanguage();
  const portfolioContent = getPortfolioContent(Language.Current);
  const [currentTag, setCurrentTag] = useState<PortfolioTag | null>(null);
  const [filteredPortfolio, setFilteredPortfolio] =
    useState<PortfolioItem[]>(portfolio);

  useEffect(() => {
    setFilteredPortfolio(
      !currentTag
        ? portfolio
        : portfolio.filter((item) => item.tags.includes(currentTag))
    );
  }, [currentTag]);

  return (
    <section>
      <div className="container d-flex flex-column align-items-center">
        <div className="title text-bold">{portfolioContent.portfolio}</div>
        <div
          className="note d-flex flex-column"
          style={{ width: "100%", padding: "0 1em", gap: "0.5em 1em" }}
        >
          <button
            onClick={() => {
              setCurrentTag(null);
            }}
            className="btn card-link"
            style={{
              width: "fit-content",
              padding: "0 0.5em",
              borderRadius: "5px",
              ...(!currentTag ? { filter: "brightness(2)" } : {}),
            }}
          >
            {portfolioContent.all}
          </button>
          {Object.entries(portfolioTagCategories).map(([category, tags]) => (
            <div
              key={category}
              className="d-flex flex-column"
              style={{ gap: "0.5em" }}
            >
              <div>{portfolioContent[category as keyof PortfolioContent]}</div>
              <div className="d-flex" style={{ gap: "0.5em" }}>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setCurrentTag(tag);
                    }}
                    className="btn card-link"
                    style={{
                      padding: "0 0.5em",
                      borderRadius: "5px",
                      ...(tag === currentTag
                        ? { filter: "brightness(2)" }
                        : {}),
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredPortfolio.length === 0 ? (
          <>{portfolioContent.nofound}</>
        ) : (
          filteredPortfolio.map((item: PortfolioItem) => (
            <div
              key={item.title.english}
              id={slugify(item.title.english)}
              className="card bordered shadow d-flex no-wrap-on-desktop"
              style={{
                width: "100%",
                padding: "1em",
                gap: "1em",
              }}
            >
              <Image
                className="title shadow"
                src={item.imageSrc}
                alt={`${item.title.english} icon`}
                width={300}
                height={300}
                style={{
                  height: "1.5em",
                  width: "auto",
                  borderRadius: "100%",
                }}
              />
              <div
                className="d-flex flex-column flex-grow"
                style={{ gap: "0.5em" }}
              >
                <div className="content text-bold">
                  {item.title[Language.Current]}
                </div>
                <div className="hint d-flex" style={{ gap: "0.5em" }}>
                  <ClockCircleOutlined />
                  {item.time}
                </div>
                <div className="note">{item.about[Language.Current]}</div>
                {item.links.map((link) => (
                  <OutsideLink
                    key={link.href}
                    href={link.href}
                    className="hint d-flex"
                    style={{
                      width: "fit-content",
                      flexWrap: "nowrap",
                      gap: "0.5em",
                      opacity: "0.7",
                    }}
                  >
                    {categoryIcon[link.category]}
                    <span>{link.href}</span>
                  </OutsideLink>
                ))}
                <ul className="note">
                  {item.description[Language.Current].map((part, index) => (
                    <li key={index}>{part}</li>
                  ))}
                </ul>
                <div
                  className="hint d-flex"
                  style={{
                    flexWrap: "nowrap",
                    gap: "0.5em",
                  }}
                >
                  <TagOutlined />
                  <div
                    className="d-flex"
                    style={{
                      flexWrap: "wrap",
                      gap: "0.5em",
                    }}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          borderRadius: "5px",
                          whiteSpace: "nowrap",
                          padding: "0 0.5em",
                          backgroundColor: "var(--background-color)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <Link className="note" href="/#portfolio">
          返回
        </Link>
      </div>
    </section>
  );
};
{
  /* <button
  key={tag}
  onClick={() => {
    setCurrentTag(tag);
  }}
  className="btn card-link"
  style={{
    padding: "0 0.5em",
    borderRadius: "5px",
    ...(tag === currentTag ? { filter: "brightness(2)" } : {}),
  }}
>
  {tag}
</button> */
}
