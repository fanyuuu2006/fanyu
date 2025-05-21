import { LuBriefcase, LuGraduationCap, LuUsers } from "react-icons/lu";
import { ExperienceItem, ExperienceTab } from "../types/experience";
import {
  EnvironmentOutlined,
  InstagramOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const NTUST: ExperienceItem = {
  name: {
    chinese: "國立臺灣科技大學",
    english: "National Taiwan University of Science and Technology",
  },
  department: {
    chinese: "資訊管理系",
    english: "Department of Information Management",
  },
  role: {
    chinese: "就讀中",
    english: "Currently Enrolled",
  },
  duration: { start: "2024-09", end: null },
  links: [
    {
      chinese: "國立臺灣科技大學官網",
      english:
        "National Taiwan University of Science and Technology Official Website",
      icon: <LinkOutlined />,
      href: "https://www.ntust.edu.tw/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rzro8g26H8Pb1f1EA",
    },
  ],
  imageSrc: "/Experience/Education/NTUST.png",
};

const CPSHS: ExperienceItem = {
  name: {
    chinese: "私立治平高級中學",
    english: "Chih Ping Senior High School",
  },
  department: {
    chinese: "電子商務科",
    english: "Department of Electronic Commerce",
  },
  role: {
    chinese: "高職畢業",
    english: "Vocational High School Diploma",
  },
  duration: { start: "2021-09", end: "2024-06" },
  links: [
    {
      chinese: "私立治平高級中學官網",
      english: "Chih Ping Senior High School Official Website",
      icon: <LinkOutlined />,
      href: "https://www.cpshs.tyc.edu.tw/",
    },
    {
      chinese: "臺灣省桃園市楊梅區",
      english: "Yangmei District, Taoyuan City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/PoxfwWMvbdLbpSMH8",
    },
  ],
  imageSrc: "/Experience/Education/CPSHS.png",
};

const FGJH: ExperienceItem = {
  name: {
    chinese: "新竹縣立富光國民中學",
    english: "Fu Guang Junior High School",
  },
  role: {
    chinese: "國中畢業",
    english: "Junior High School Diploma",
  },
  duration: { start: "2018-09", end: "2021-06" },
  links: [
    {
      chinese: "新竹縣立富光國民中學官網",
      english: "Fu Guang Junior High School Official Website",
      icon: <LinkOutlined />,
      href: "https://fgjh.hcc.edu.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/FZ1kwUBVNgYHk8Uj8",
    },
  ],
  imageSrc: "/Experience/Education/FGJH.png",
};

const GSES: ExperienceItem = {
  name: {
    chinese: "新竹縣立關西國民小學",
    english: "Guan Shi Elementary School",
  },
  role: {
    chinese: "國小畢業",
    english: "Elementary School Diploma",
  },
  duration: { start: "2012-09", end: "2018-06" },
  links: [
    {
      chinese: "新竹縣立關西國民小學官網",
      english: "Guan Shi Elementary School Official Website",
      icon: <LinkOutlined />,
      href: "https://gses.hcc.edu.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rpe6AUrEDmfryADM8",
    },
  ],
  imageSrc: "/Experience/Education/GSES.png",
};

const NTUST_BGC: ExperienceItem = {
  name: {
    chinese: "桌上遊戲研究社",
    english: "BoardGame Club",
  },
  role: {
    chinese: "儲備幹部",
    english: "Prospective Cadre",
  },
  organization: NTUST,
  duration: { start: "2024-09", end: null },

  imageSrc: "/Experience/Club/NTUST_BGC.jpg",
  links: [
    {
      chinese: "台科大桌遊社 Instagram",
      english: "NTUST BoardGame Club Instagram",
      icon: <InstagramOutlined />,
      href: "https://www.instagram.com/ntust_boardgame/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rzro8g26H8Pb1f1EA",
    },
  ],
};

const LFR: ExperienceItem = {
  name: {
    chinese: "六福莊生態渡假旅館",
    english: "Leofoo Resort",
  },
  role: {
    chinese: "臨時工讀生",
    english: "Temporary Part-Time Worker",
  },
  duration: { start: "2022-03", end: "2022-03" },
  imageSrc: "/Experience/Work/LFR.jpg",
  links: [
    {
      chinese: "六福莊官網",
      english: "Leofoo Resort Official Website",
      icon: <LinkOutlined />,
      href: "https://www.leofooresort.com.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/SJLFkVeApdBn51SC9",
    },
  ],
};

const KNSH: ExperienceItem = {
  name: {
    chinese: "康軒文教集團桃園物流中心",
    english: "Kang Hsuan Educational Publishing Group Taoyuan Logistics Center",
  },
  role: {
    chinese: "暑期工讀生",
    english: "Summer Part-Time Worker",
  },
  duration: { start: "2024-06", end: "2024-07" },
  imageSrc: "/Experience/Work/KNSH.jpg",
  links: [
    {
      chinese: "康軒文教集團官網",
      english: "Kang Hsuan Educational Publishing Group Official Website",
      icon: <LinkOutlined />,
      href: "https://www.knsh.com.tw/",
    },
    {
      chinese: "臺灣省桃園市龍潭區",
      english: "Longtan District, Taoyuan City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/pYfSEkjiioLtjrJi6",
    },
  ],
};

const LFV: ExperienceItem = {
  name: {
    chinese: "六福村主題遊樂園",
    english: "Leofoo Village Theme Paradise",
  },
  role: {
    chinese: "臨時工讀生",
    english: "Temporary Part-Time Worker",
  },
  duration: { start: "2024-08", end: "2024-08" },
  imageSrc: "/Experience/Work/LFV.jpg",
  links: [
    {
      chinese: "六福村官網",
      english: "Leofoo Village Official Website",
      icon: <LinkOutlined />,
      href: "https://www.leofoovillage.com.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/5Pw8JPka4y6ozgT68",
    },
  ],
};

const HXL: ExperienceItem = {
  name: {
    chinese: "豪享來麵店",
    english: "Hao Xiang Lai Noodle Shop",
  },
  role: {
    chinese: "工讀生",
    english: "Part-Time Worker",
  },
  organization: NTUST,
  duration: { start: "2024-10", end: null },
  imageSrc: "/Experience/Work/HXL.jpg",
  links: [
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/55EnRfHo8HUqbXvt8",
    },
  ],
};

export const experienceTabs = ["education", "club", "work"] as const;

export const experience: Record<ExperienceTab, ExperienceItem[]> = {
  education: [NTUST, CPSHS, FGJH, GSES],
  club: [NTUST_BGC],
  work: [HXL, LFV, KNSH, LFR],
};

export const experienceTabIcons: Record<ExperienceTab, React.ReactNode> = {
  education: <LuGraduationCap />,
  club: <LuUsers />,
  work: <LuBriefcase />,
};
