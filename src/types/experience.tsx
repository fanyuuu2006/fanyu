import { LanguageContent } from "./language";

export type Duration = {
  start: string | null;
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
  description?: string;
  imageSrc: string;
  links?: LinkContent<string>[];
  skills?: string[];
  tags?: string[];
};
