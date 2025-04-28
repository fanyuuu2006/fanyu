"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { portfolio } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import { PortfolioItem } from "@/types/portfolio";
import { ClockCircleOutlined, TagOutlined } from "@ant-design/icons";
import Link from "next/link";

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
  return (
    <section id="portfolio">
      <div className="container d-flex flex-column align-items-center">
        <div className="title text-bold">{portfolioContent.portfolio}</div>
        <div className="d-flex justify-content-between" style={{ gap: "1em" }}>
          {portfolio.slice(0, 3).map((item: PortfolioItem, index: number) => (
            <Link
              key={item.title.english}
              href={`/portfolio/#${index}`}
              className="card card-link bordered shadow d-flex flex-column align-items-center"
              style={{
                flex: "1 1 30%",
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
                  width: "60%",
                  height: "auto",
                  borderRadius: "100%",
                  objectFit: "cover", // 確保圖片不變形
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

                <div
                  className="hint d-flex"
                  style={{ flexWrap: "nowrap", gap: "0.5em" }}
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
