import { ExperienceItem } from "@/types/experience";
import { EnvironmentOutlined, InstagramOutlined } from "@ant-design/icons";

export const PDAO: ExperienceItem = {
  name: {
    chinese: "PDAO (Programming Design And Optimization)",
    english: "PDAO (Programming Design And Optimization)",
  },
  department: {
    chinese: "不知道對不隊",
    english: "Don’t Know Right Team",
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
      {{ chinese: "第 {{rank}} 名", english: "{{rank}}th" }[language].replace(
        "{{rank}}",
        "59"
      )}
    </span>
  ),
};
