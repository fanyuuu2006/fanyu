import { LanguageContent } from "@/types/language";
import { ClubItem, DegreeOption, EducationItem } from "../types/experience";

export const degreeMap: LanguageContent<Record<DegreeOption, string>> = {
  chinese: {
    "In Progress": "就讀中",
    Bachelor: "學士",
    Master: "碩士",
    Doctor: "博士",
    "High School Diploma": "高中畢業",
    "Vocational High School Diploma": "高職畢業",
    "Junior High School Diploma": "國中畢業",
    "Elementary School Diploma": "國小畢業",
  },
  english: {
    "In Progress": "In Progress",
    Bachelor: "Bachelor's",
    Master: "Master's",
    Doctor: "Doctorate",
    "High School Diploma": "High School Diploma",
    "Vocational High School Diploma": "Vocational High School Diploma",
    "Junior High School Diploma": "Junior High School Diploma",
    "Elementary School Diploma": "Elementary School Diploma",
  },
};

const NTUST: EducationItem = {
  school: {
    chinese: "國立臺灣科技大學",
    english: "National Taiwan University of Science and Technology",
  },
  department: {
    chinese: "資訊管理系",
    english: "Department of Information Management",
  },
  degree: "In Progress",
  duration: "2024-09 ~",
  imageSrc: "/Experience/Education/NTUST.png",
  href: "https://www.ntust.edu.tw/",
};

const CPSHS: EducationItem = {
  school: {
    chinese: "私立治平高級中學",
    english: "Chih Ping Senior High School",
  },
  department: {
    chinese: "電子商務科",
    english: "Department of Electronic Commerce",
  },
  degree: "Vocational High School Diploma",
  duration: "2021-09 ~ 2024-06",
  imageSrc: "/Experience/Education/CPSHS.png",
  href: "https://www.cpshs.tyc.edu.tw/",
};

const FGJH: EducationItem = {
  school: {
    chinese: "新竹縣立富光國民中學",
    english: "Fu Guang Junior High School",
  },
  degree: "Junior High School Diploma",
  duration: "2018-09 ~ 2021-06",
  imageSrc: "/Experience/Education/FGJH.png",
  href: "https://fgjh.hcc.edu.tw/",
};

const GSES: EducationItem = {
  school: {
    chinese: "新竹縣立關西國民小學",
    english: "Guan Shi Elementary School",
  },
  degree: "Elementary School Diploma",
  duration: "2012-09 ~ 2018-06",
  imageSrc: "/Experience/Education/GSES.png",
  href: "https://gses.hcc.edu.tw/",
};

const NTUST_BGC: ClubItem = {
  name: {
    chinese: "桌遊社 (國立臺灣科技大學)",
    english:
      "BoardGame Club (National Taiwan University of Science and Technology)",
  },
  role: {
    chinese: "社員",
    english: "Member",
  },
  duration: "2024-9 ~",
  imageSrc: "/Experience/Club/GSES.png",
};

export const experience: {
  education: EducationItem[];
  club: ClubItem[];
} = {
  education: [NTUST, CPSHS, FGJH, GSES],
  club: [NTUST_BGC],
};
