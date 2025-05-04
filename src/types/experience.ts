import { LanguageContent } from "./language";

export type DegreeOption =
  | "In Progress"
  | "Bachelor"
  | "Master"
  | "Doctor"
  | "High School Diploma"
  | "Vocational High School Diploma"
  | "Junior High School Diploma"
  | "Elementary School Diploma";

export type Duration = {
  start: string | null;
  end: string | null;
};

export type LinkContent<T> = {
  href: string;
} & LanguageContent<T>;

export type EducationItem = {
  name: LanguageContent<string>;
  degree: DegreeOption;
  department?: LanguageContent<string>;
  duration: Duration;
  description?: string;
  imageSrc: string;
  href: string;
  location: LinkContent<string>;
};

export type ClubItem = {
  name: LanguageContent<string>;
  organization?: EducationItem;
  role: LanguageContent<string>;
  duration: Duration;
  description?: string;
  imageSrc: string;
  href: string;
};
