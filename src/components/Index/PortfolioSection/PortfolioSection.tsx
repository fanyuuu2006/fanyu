"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { ProjectsDiv } from "./ProjectsDiv";
import { Title } from "@/components/custom/Title";

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
      <div className="container flex flex-col items-center">
        <Title >
          {portfolioContent.portfolio}
        </Title>
        <ProjectsDiv />
      </div>
    </section>
  );
};
