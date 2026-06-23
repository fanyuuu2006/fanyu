import { MetadataRoute } from "next";
import { DateString } from "./date";
import { tagCategories } from "@/libs/portfolio";

type BaseRoute = MetadataRoute.Sitemap[number] & {
  label: string;
  isActive?: (path: string) => boolean;
  hidden?: {
    header?: boolean;
    footer?: boolean;
  };
};

export type Route = BaseRoute & {
  sub?: Omit<BaseRoute, "isActive">[];
};

export type SkillItem = {
  title: string;
  url?: string;
};

export type PortfolioTagCategory = keyof typeof tagCategories;
export type PortfolioTag = (typeof tagCategories)[PortfolioTagCategory][number];

export type PortfolioItem = {
  title: string;
  imageUrl: string;
  date: DateString;
  description: string[];
  overview: string;
  links: {
    label: string;
    url: string;
  }[];
  github?: {
    repo: `${string}/${string}`;
    giscus?: {
      repoId: string;
      categoryId: string;
    };
  };
  tags: PortfolioTag[];
};

export type EducationItem = {
  school: string;
  department?: string;
  degree: string;
  duration: {
    start: DateString;
    end?: DateString;
  };
  description?: React.ElementType;
  logo?: string;
  link?: string;
};
