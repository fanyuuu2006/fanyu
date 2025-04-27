"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { portfolio } from "@/lib/portfolio";
import { LanguageContent, LanguageOption } from "@/types/language";
import { PortfolioItem, PortfolioLinkCategory } from "@/types/portfolio";
import {
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";

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

const categoryIcon: Record<PortfolioLinkCategory, React.ReactNode> = {
  demo: <LinkOutlined />,
  github: <GithubOutlined />,
};

export const PortfolioSection = () => {
  const Language = useLanguage();
  const portfolioContent = getPortfolioContent(Language.Current);
  return (
    <section id="portfolio">
      <div className="container d-flex flex-column align-items-center">
        <div className="title text-bold">{portfolioContent.portfolio}</div>
        <div className="d-flex" style={{ width: "100%", gap: "1em" }}>
          {portfolio.map((item: PortfolioItem) => (
            <div
              key={item.title.english}
              className="card bordered shadow d-flex"
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
                <div className="label text-bold">
                  {item.title[Language.Current]}
                </div>
                <div className="hint">
                  <ClockCircleOutlined /> {item.time}
                </div>
                <div className="note">{item.about[Language.Current]}</div>
                {item.links.map((link) => (
                  <OutsideLink
                    key={link.href}
                    href={link.href}
                    className="hint d-flex"
                    style={{
                      flexWrap: "nowrap",
                      gap: "0.5em",
                      opacity: "0.7",
                      transformOrigin: "left",
                    }}
                  >
                    {categoryIcon[link.category]}
                    <span>{link.href}</span>
                  </OutsideLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
