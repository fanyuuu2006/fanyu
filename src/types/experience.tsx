import { experienceTabs } from "@/libs/experience";
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
  description?: React.FC<{ language: LanguageOption }>;
  imageSrc?: string;
  links?: LinkContent<string>[];
};

export type ExperienceTab = (typeof experienceTabs)[number];
