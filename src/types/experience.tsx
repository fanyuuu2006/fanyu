import { experienceTabs } from "@/libs/education";
import { LanguageContent, LanguageOption } from "./language";

type Year = `${number}`;

// 月份：01-12
type Month = 
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

// 日期：01-31
type Day = 
  | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10"
  | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20"
  | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31";

export type DateString =
  | `${Year}-${Month}-${Day}` // 完整日期格式：YYYY-MM-DD
  | `${Year}-${Month}`; // 年月格式：YYYY-MM

export type Duration = {
  start: DateString;
  end: DateString | null;
} | DateString;

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
