import { ExperienceItem } from "@/types/experience";
import {
  EnvironmentOutlined,
  InstagramOutlined,
  LinkOutlined,
} from "@ant-design/icons";

export const PDAO: ExperienceItem = {
  name: {
    chinese: "Programming Design And Optimization",
    english: "Programming Design And Optimization",
  },
  department: {
    chinese: "不知道對不隊",
    english: "Don't Know If It's the Right Team",
  },
  role: {
    chinese: "隊員",
    english: "Member",
  },
  duration: { start: "2025-04", end: "2025-04" },
  imageSrc: "/Experience/Competition/PDAO.jpg",
  links: [
    {
      chinese: "PDAO Instagram",
      english: "PDAO Instagram",
      icon: <InstagramOutlined />,
      href: "https://www.instagram.com/pdao_ntuim/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/MvSK9ZHVXD2GiGvA9",
    },
  ],
  description: ({ language }) => (
    <span className="note font-bold">
      {{ chinese: "第 59 名", english: "59th" }[language]}
    </span>
  ),
};

export const HCCGM: ExperienceItem = {
  name: {
    chinese: "新竹縣國民中學創新思考金頭腦數學競賽 ",
    english:
      "Hsinchu County Junior High School Innovative Thinking Golden Mind Math Competition",
  },
  department: {
    chinese: "富光國中",
    english: "Fu Guang Junior High School",
  },
  role: {
    chinese: "隊員",
    english: "Member",
  },
  duration: { start: "2021-01", end: "2021-01" },
  imageSrc: "/Experience/Competition/HCCGM.jpg",
  links: [
    {
      chinese: "金頭腦數學競賽官網",
      english: "Golden Mind Math Competition Official Website",
      icon: <LinkOutlined />,
      href: "https://sites.google.com/view/hccgoldenmind/",
    },
    {
      chinese: "臺灣省新竹縣新豐鄉",
      english: "Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/KJsTatVSbbJhiCKx8",
    },
  ],
  description: ({ language }) => (
    <span className="note font-bold">
      {{ chinese: "團體組 第 2 名", english: "Team 2nd Place" }[language]}
    </span>
  ),
};
