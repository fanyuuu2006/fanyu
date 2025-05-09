import { ContactData } from "./contact";
import { experience } from "./experience";
import { projects } from "./projects";

export const profile = {
  name: {
    chinese: "范余振富",
    english: "Fan-Yu Zhen-Fu",
  },
  nickname: {
    chinese: "飯魚",
    english: "FanYu",
  },
  nationality: {
    chinese: "中華民國 (臺灣)",
    english: "Republic of China (Taiwan)",
  },
  from: {
    chinese: "臺灣省新竹縣關西鎮",
    english: "Guanxi Township, Hsinchu County, Taiwan",
  },
  location: {
    chinese: "臺灣省臺北市大安區",
    english: "Da'an Dist, Taipei City, Taiwan",
  },
  birthday: "2006/05/26 UTC+08:00",
  experience,
  portfolio: {
    projects,
  },
  contact: ContactData,
} as const;
