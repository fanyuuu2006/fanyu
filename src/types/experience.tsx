import { experienceTabs } from "@/libs/education";
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

export type Semester = `${number}-${1 | 2}`;
export type Grade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "E"
  | "X"
  | "通過";
export type Course = {
  courseName: LanguageContent<string>;
  grade: Grade | null;
  credits: number;
};
export type SemesterData = {
  classRank?: number;
  departmentRanK?: number;
  courses: Course[];
};
