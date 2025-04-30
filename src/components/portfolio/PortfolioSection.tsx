"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { portfolio, portfolioTags } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  PortfolioItem,
  PortfolioLinkCategory,
  ProfileTag,
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
import { useEffect, useState } from "react";

type PortfolioContent = Record<"portfolio" | "nofound", string>;

const getPortfolioContent = (language: LanguageOption): PortfolioContent =>
  ((
    {
      chinese: {
        portfolio: "作品集",
        nofound: "暫無符合條件的作品",
      },
      english: {
        portfolio: "Portfolio",
        nofound: "No matching portfolio found",
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
  const [currentTag, setCurrentTag] = useState<ProfileTag | null>(null);
  const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>(
    []
  );

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
        <div className="d-flex" style={{ gap: "0.5em" }}>
          <button
            onClick={() => {
              setCurrentTag(null);
            }}
            className="btn card-link"
            style={{
              padding: "0 0.5em",
              borderRadius: "5px",
              ...(!currentTag ? { filter: "brightness(2)" } : {}),
            }}
          >
            全部
          </button>
          {portfolioTags.map((tag) => (
            <button
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
            </button>
          ))}
        </div>
        {filteredPortfolio.length === 0 ? (
          <>{portfolioContent.nofound}</>
        ) : (
          filteredPortfolio.map((item: PortfolioItem) => (
            <div
              key={item.title.english}
              id={item.title.english.replace(/ /g, "")}
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
