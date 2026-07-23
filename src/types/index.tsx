import { MetadataRoute } from "next";
import { DateString } from "./date";
import { MyImage } from "@/components/MyImage";

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
  svg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type RepoString = `${string}/${string}`;
export type PortfolioItem = {
  title: string;
  imageUrl: string;
  date: DateString;
  overview: string;
  links: {
    label: string;
    url: string;
  }[];
  github?: {
    repo: RepoString;
    giscus?: {
      repoId: string;
      categoryId: string;
    };
  };
  tags: string[];
};
export type ContactItem = {
  label: string;
  icon: React.ComponentType;
  url: string;
  colors?: React.CSSProperties["color"][];
  info: {
    image?: Omit<React.ComponentPropsWithRef<typeof MyImage>, "alt">;
    id: string;
    name: string;
    about?: React.ComponentType;
  };
};

export type MyResponse<T> = {
  data: T | null;
  error: string | undefined;
};

type _AnalyticsInfo = {
  visitors: number;
  pageViews: number;
};
export type AnalyticsInfo = {
  total: _AnalyticsInfo;
  monthly: _AnalyticsInfo;
};
