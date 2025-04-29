import { LanguageContent } from "./language";

export type PortfolioLinkCategory = "demo" | "github" | "package";

export type PortfolioItem = {
  imageSrc: string;
  title: LanguageContent<string>;
  links: { category: PortfolioLinkCategory; href: string }[];
  time: string;
  about: LanguageContent<string>;
  description: LanguageContent<string[]>;
  tags: string[];
};
