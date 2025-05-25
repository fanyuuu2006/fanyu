import { ContactData } from "./contact";
import { experience } from "./experience";
import { projects } from "./projects";
import { skills } from "./skill";

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
  age: () => {
    const today = new Date();

    const birthYear = 2006;
    const birthMonth = 4; // 0-indexed（4 = 5 月）
    const birthDate = 26;

    let age = today.getFullYear() - birthYear;

    // 如果今天的日期還沒到生日，就減一歲
    const birthdayNotYet =
      today.getMonth() < birthMonth ||
      (today.getMonth() === birthMonth && today.getDate() < birthDate);

    if (birthdayNotYet) age--;

    return age;
  },
  experience,
  portfolio: {
    projects,
  },
  contact: ContactData,
  skills,
} as const;
