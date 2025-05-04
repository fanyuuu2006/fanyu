"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { PortfolioItem } from "@/types/portfolio";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PortfolioLinkCard } from "./PortfolioLinkCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import { profile } from "../../../lib/profile";

type PortfolioContent = Record<"portfolio" | "viewMore", string>;

const getPortfolioContent = (language: LanguageOption): PortfolioContent =>
  ((
    {
      chinese: {
        portfolio: "作品集",
        viewMore: "查看全部",
      },
      english: {
        portfolio: "Portfolio",
        viewMore: "View all",
      },
    } as LanguageContent<PortfolioContent>
  )[language]);

export const PortfolioSection = () => {
  const Language = useLanguage();
  const portfolioContent = getPortfolioContent(Language.Current);

  const [shuffledPortfolio, setShuffledPortfolio] = useState<PortfolioItem[]>(
    []
  );

  useEffect(() => {
    const shuffled = profile.portfolio
      .toSorted(() => Math.random() - 0.5)
      .slice(0, 3);
    setShuffledPortfolio(shuffled);
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
        <Link className="note" href="/portfolio">
          {portfolioContent.viewMore}{" "}
          <ArrowRightOutlined className="rotate-315" />
        </Link>
      </div>
    </section>
  );
};
