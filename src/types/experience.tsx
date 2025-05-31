import { experienceTabs } from "@/lib/experience";
import { LanguageContent, LanguageOption } from "./language";

export type Duration = {
  start: string;
  end: string | null;
};

export type LinkContent<T> = {
  icon?: React.ReactNode;
  href: string;
} & LanguageContent<T>;

export type ExperienceItem = {
  name: LanguageContent<string>;
  department?: LanguageContent<string>;
  organization?: ExperienceItem;
  role?: LanguageContent<string>;
  duration: Duration;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: React.FC<{ language: LanguageOption, [key: string]: any }>;
  imageSrc?: string;
  links?: LinkContent<string>[];
};

export type ExperienceTab = (typeof experienceTabs)[number];
