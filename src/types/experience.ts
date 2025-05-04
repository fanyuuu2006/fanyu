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

export type EducationItem = {
  school: LanguageContent<string>;
  degree: DegreeOption;
  department?: LanguageContent<string>;
  duration: string;
  description?: string;
  imageSrc: string;
  href: string;
  location: LanguageContent<string>;
};

export type ClubItem = {
  name: LanguageContent<string>;
  role: LanguageContent<string>;
  duration: string;
  description?: string;
  imageSrc: string;
};
