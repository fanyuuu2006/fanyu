import { ExperienceItem } from "@/types/experience";
import { InstagramOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { NTUST } from "./education";

export const NTUST_BGC: ExperienceItem = {
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