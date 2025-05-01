"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { portfolio } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import { PortfolioItem } from "@/types/portfolio";
import { ClockCircleOutlined, TagOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { slugify } from "@/utils/url";

type PortfolioContent = Record<"portfolio", string>;

const getPortfolioContent = (language: LanguageOption): PortfolioContent =>
  ((
    {
      chinese: {
        portfolio: "作品集",
      },
      english: {
        portfolio: "Portfolio",
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
    const shuffled = portfolio.toSorted(() => Math.random() - 0.5).slice(0, 3);
    setShuffledPortfolio(shuffled);
  }, []);

  return (
    <section id="portfolio">
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{portfolioContent.portfolio}</div>
        <div className="flex flex-wrap justify-between gap-4">
          {shuffledPortfolio.map((item: PortfolioItem) => (
            <Link
              key={item.title.english}
              href={`/portfolio/#${slugify(item.title.english)}`}
              className="card card-link bordered shadow flex flex-col items-center p-4 gap-4 flex-1 basis-full md:basis-3/10"
            >
              <Image
                className="title shadow w-3/5 h-auto rounded-full object-cover"
                src={item.imageSrc}
                alt={`${item.title.english} icon`}
                width={300}
                height={300}
              />
              <div className="flex flex-col gap-2">
                <div className="content font-bold">
                  {item.title[Language.Current]}
                </div>
                <div className="hint flex gap-2">
                  <ClockCircleOutlined />
                  {item.time}
                </div>
                <div className="note">{item.about[Language.Current]}</div>

                <div className="hint flex flex-nowrap gap-2">
                  <TagOutlined />
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        className="rounded-sm whitespace-nowrap px-2 bg-[var(--background-color)]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link className="note" href="/portfolio">
          查看更多
        </Link>
      </div>
    </section>
  );
};
