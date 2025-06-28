"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { ProjectsDiv } from "./ProjectsDiv";
import { useInViewUnderlineSpread } from "@/hooks/useInViewUnderlineSpread";

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
  const ref = useInViewUnderlineSpread<HTMLHeadingElement>();

  return (
    <section id="portfolio">
      <div className="container flex flex-col items-center">
        <h1 ref={ref} className="text-5xl font-bold">
          {portfolioContent.portfolio}
        </h1>
        <ProjectsDiv />
      </div>
    </section>
  );
};
