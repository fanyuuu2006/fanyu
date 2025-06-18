import { profile } from "@/libs/profile";
import type { Metadata } from "next";

const title = `${profile.nickname.chinese} ${profile.nickname.english}`;
const description = `${profile.description.chinese} ${profile.description.english}`;
const url = profile.url;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | " + title,
  },
  description,
  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
  },
  authors: [
    { name: profile.nickname.english, url: "https://github.com/fanyuuu2006" },
  ],

  keywords: [
    // 🧑 個人名稱/暱稱
    "FanYu",
    "范余",
    "飯魚",
    "Fan-Yu Zhen-Fu",
    "范余振富",
    "飯魚正負",
    "fan._.yuu",
    "fanyuuu2006",
    "范振富",

    // 💻 技能與職能
    "Frontend Developer",
    "Web Developer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Tailwind CSS",
    "GitHub",
    "Node.js",

    // 🏫 教育背景
    "NTUST",
    "National Taiwan University of Science and Technology",
    "台科大",
    "臺灣科技大學",
    "桌遊社",
    "桌上遊戲研究社",
    "台科大桌遊社",
    "美宣",
    "Board Game Club",
    "資訊管理系",
    "治平高中",
    "CPSHS",
    "電子商務科",
    "富光國中",
    "FGJH",
    "關西國小",
    "GSES",
    "新竹縣",
    "關西",

    // 🧾 網站與用途
    "personal website",
    "portfolio",
    "個人網站",
    "開發作品",
    "履歷",
    "簡歷",

    // 🎮 相關作品與彩蛋
    "LaBaG",
    "啦八機",
    "超級阿禾",
    "SuperHHH",
    "陳敬禾",
    "阿禾",
    "綠光阿瑋",
    "GreenWei",
    "拉霸機",
    "c063",
    "fanyucomponents",
    "小傲嬌",
  ],

  openGraph: {
    siteName: title,
    title,
    description,
    url,
    images: [
      {
        url: "/GameShow.jpg",
        alt: "FanYu Profile Image",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/GameShow.jpg"],
  },
  robots: "index, follow",

  verification: {
    google: "BPwLDvPkjbND-Djvxq812SdYkm2pHQ18WPWt2KkPiQk",
  },
  alternates: {
    canonical: "/",
  },
};
