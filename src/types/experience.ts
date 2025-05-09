import { LanguageContent } from "./language";

export enum DegreeOption {
  InProgress = "In Progress",
  Bachelor = "Bachelor",
  Master = "Master",
  Doctor = "Doctor",
  HighSchool = "High School Diploma",
  VocationalHighSchool = "Vocational High School Diploma",
  JuniorHigh = "Junior High School Diploma",
  Elementary = "Elementary School Diploma",
}

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
