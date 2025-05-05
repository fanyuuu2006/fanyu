"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { PortfolioItem } from "@/types/portfolio";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PortfolioLinkCard } from "./PortfolioLinkCard";
import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import { profile } from "../../../lib/profile";
import { Tooltip } from "antd";

type PortfolioContent = Record<"portfolio" | "viewMore" | "shuffle", string>;

const getPortfolioContent = (language: LanguageOption): PortfolioContent =>
  ((
    {
      chinese: {
        portfolio: "作品集",
        viewMore: "查看全部",
        shuffle: "換一批",
      },
      english: {
        portfolio: "Portfolio",
        viewMore: "View all",
        shuffle: "Shuffle",
      },
    } as LanguageContent<PortfolioContent>
  )[language]);

export const PortfolioSection = () => {
  const Language = useLanguage();
  const portfolioContent = getPortfolioContent(Language.Current);

  const [shuffledPortfolio, setShuffledPortfolio] = useState<PortfolioItem[]>(
    []
  );

  const shufflePortfolio = () => {
    const shuffled = profile.portfolio
      .toSorted(() => Math.random() - 0.5)
      .slice(0, 3);
    setShuffledPortfolio(shuffled);
  };

  useEffect(() => {
    shufflePortfolio();
  }, []);

  return (
    <section id="portfolio">
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{portfolioContent.portfolio}</div>
        <div className="flex flex-wrap justify-between gap-4">
          {shuffledPortfolio.map((item: PortfolioItem) => (
            <PortfolioLinkCard key={item.title.english} item={item} />
          ))}
        </div>
        <div className="w-full flex justify-between note items-center">
          <span /> {/**分散對齊用*/}
          <Link className="flex gap-1" href="/portfolio">
            {portfolioContent.viewMore}
            <ArrowRightOutlined className="rotate-315" />
          </Link>
          <button className="btn p-1 rounded-sm" onClick={shufflePortfolio}>
            <Tooltip title={portfolioContent.shuffle}><ReloadOutlined /></Tooltip>
          </button>
        </div>
      </div>
    </section>
  );
};
