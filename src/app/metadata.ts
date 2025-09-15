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

    // 💻 技能與職能 - 擴展更多相關詞彙
    "Frontend Developer",
    "Web Developer",
    "Fullstack Developer",
    "前端工程師",
    "網頁開發者",
    "全端開發者",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Tailwind CSS",
    "CSS",
    "HTML",
    "GitHub",
    "Node.js",
    "Git",
    "API",
    "REST API",
    "JSON",
    "Responsive Design",
    "Mobile First",
    "UI/UX",
    "Web Performance",
    "SEO",

    // 🏫 教育背景
    "NTUST",
    "National Taiwan University of Science and Technology",
    "台科大",
    "臺灣科技大學",
    "治平高中",
    "CPSHS",
    "資訊管理系",
    "Information Management",
    "電子商務科",
    "桌遊社",
    "桌上遊戲研究社",
    "台科大桌遊社",
    "Board Game Club",
    "美宣",
    "攝影",
    "富光國中",
    "FGJH",
    "關西國小",
    "GSES",
    "新竹縣",
    "關西",

    // 🌍 地理位置 SEO
    "台灣開發者",
    "Taiwan Developer",
    "台北",
    "Taipei",
    "新竹",
    "Hsinchu",
    "台灣學生開發者",
    "Taiwan Student Developer",

    // 🧾 網站與用途 - 增加更多相關詞彙
    "personal website",
    "portfolio",
    "個人網站",
    "個人作品集",
    "開發作品",
    "履歷",
    "簡歷",
    "專案展示",
    "project showcase",
    "web portfolio",
    "developer portfolio",
    "student portfolio",
    "programming projects",
    "coding projects",
    "技術部落格",
    "tech blog",

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

    // 📚 專業領域長尾關鍵字
    "網頁前端開發",
    "React 專案",
    "Next.js 作品集",
    "TypeScript 開發",
    "響應式網頁設計",
    "現代網頁開發",
    "學生開發者作品",
    "開源專案",
    "GitHub 專案",
    "Web Development Taiwan",
    "Frontend Development Taiwan",
  ],

  openGraph: {
    siteName: title,
    title,
    description,
    url,
    images: [
      {
        url: "/GameShow.jpg",
        width: 1200,
        height: 630,
        alt: "FanYu Profile Image - Frontend Developer Portfolio",
      },
    ],
    locale: "zh_TW",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: `${url}/GameShow.jpg`,
        width: 1200,
        height: 630,
        alt: "FanYu Profile Image",
      },
    ],

    creator: "@fanyuuu2006",
    site: "@fanyuuu2006",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "BPwLDvPkjbND-Djvxq812SdYkm2pHQ18WPWt2KkPiQk",
    yandex: "b1e94267c95b0001",
    me: "73B631CBCD1EBDF32F1395A77E8758D9",
  },
  alternates: {
    canonical: profile.url,
    languages: {
      "zh-TW": profile.url,
      en: profile.url,
      "x-default": profile.url,
    },
  },
};
