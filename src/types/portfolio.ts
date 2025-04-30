import { portfolioTagCategories } from "@/lib/portfolio";
import { LanguageContent } from "./language";

export type PortfolioLinkCategory = "demo" | "github" | "package";



export type PortfolioTagCategory = keyof typeof portfolioTagCategories;
export type PortfolioTag =
  (typeof portfolioTagCategories)[PortfolioTagCategory][number];

  
export type PortfolioItem = {
  imageSrc: string;
  title: LanguageContent<string>;
  links: { category: PortfolioLinkCategory; href: string }[];
  time: string;
  about: LanguageContent<string>;
  description: LanguageContent<string[]>;
  tags: PortfolioTag[];
};
