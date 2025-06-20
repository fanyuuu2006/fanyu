import { ContactData } from "./contact";
import { experience } from "./experience";
import { projects } from "./projects";
import { skills } from "./skill";

export const profile = {
  url: "https://fanyu.vercel.app",
  description: {
    chinese:
      "飯魚的個人網站，包括個人資料、自我介紹、作品集、學經歷以及聯繫方式。",
    english:
      "FanYu's personal website featuring biography, self-introduction, portfolio, education background, project experience, and contact information.",
  },
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
  birthday: "2006-05-26 UTC+08:00",
  age: () => {
    const today = new Date();
    const birthday = new Date(profile.birthday);
    const age = today.getFullYear() - birthday.getFullYear();

    const birthDayNotYet =
      today.getMonth() < birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() &&
        today.getDate() < birthday.getDate());

    return birthDayNotYet ? age - 1 : age;
  },
  experience,
  portfolio: {
    projects,
  },
  contact: ContactData,
  skills,
} as const;
