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
  name: {
    chinese: "國立臺灣科技大學",
    english: "National Taiwan University of Science and Technology",
  },
  department: {
    chinese: "資訊管理系",
    english: "Department of Information Management",
  },
  degree: "In Progress",
  duration: { start: "2024-09", end: null },
  location: {
    chinese: "臺灣省臺北市大安區",
    english: "Da'an District, Taipei City, Taiwan",
    href: "https://maps.app.goo.gl/Rzro8g26H8Pb1f1EA",
  },
  imageSrc: "/Experience/Education/NTUST.png",
  href: "https://www.ntust.edu.tw/",
};

const CPSHS: EducationItem = {
  name: {
    chinese: "私立治平高級中學",
    english: "Chih Ping Senior High School",
  },
  department: {
    chinese: "電子商務科",
    english: "Department of Electronic Commerce",
  },
  degree: "Vocational High School Diploma",
  duration: { start: "2021-09", end: "2024-06" },
  location: {
    chinese: "臺灣省桃園市楊梅區",
    english: "Yangmei District, Taoyuan City, Taiwan",
    href: "https://maps.app.goo.gl/PoxfwWMvbdLbpSMH8",
  },
  imageSrc: "/Experience/Education/CPSHS.png",
  href: "https://www.cpshs.tyc.edu.tw/",
};

const FGJH: EducationItem = {
  name: {
    chinese: "新竹縣立富光國民中學",
    english: "Fu Guang Junior High School",
  },
  degree: "Junior High School Diploma",
  duration: { start: "2018-09", end: "2021-06" },
  location: {
    chinese: "臺灣省新竹縣關西鎮",
    english: "Guanxi Township, Hsinchu County, Taiwan",
    href: "https://maps.app.goo.gl/FZ1kwUBVNgYHk8Uj8",
  },
  imageSrc: "/Experience/Education/FGJH.png",
  href: "https://fgjh.hcc.edu.tw/",
};

const GSES: EducationItem = {
  name: {
    chinese: "新竹縣立關西國民小學",
    english: "Guan Shi Elementary School",
  },
  degree: "Elementary School Diploma",
  duration: { start: "2012-09", end: "2018-06" },
  location: {
    chinese: "臺灣省新竹縣關西鎮",
    english: "Guanxi Township, Hsinchu County, Taiwan",
    href: "https://maps.app.goo.gl/Rpe6AUrEDmfryADM8",
  },
  imageSrc: "/Experience/Education/GSES.png",
  href: "https://gses.hcc.edu.tw/",
};

const NTUST_BGC: ClubItem = {
  name: {
    chinese: "桌遊社",
    english: "BoardGame Club",
  },
  role: {
    chinese: "社員",
    english: "Member",
  },
  organization: NTUST,
  duration: { start: "2024-09", end: null },

  imageSrc: "/Experience/Club/NTUST_BGC.jpg",
  href: "https://www.instagram.com/ntust_boardgame/",
};

export const experience: {
  education: EducationItem[];
  club: ClubItem[];
} = {
  education: [NTUST, CPSHS, FGJH, GSES],
  club: [NTUST_BGC],
};
