import { profile } from "@/lib/profile";
import type { Metadata } from "next";

const title = "飯魚 FanYu";
const description =
  "飯魚的個人網站，包括個人資料、自我介紹、作品集、學經歷以及聯繫方式。FanYu's personal website featuring biography, self-introduction, portfolio, education background, project experience, and contact information.";
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
  authors: [{ name: "FanYu", url: "https://github.com/fanyuuu2006" }],

  keywords: [
    "FanYu",
    "范余",
    "飯魚",
    "Fan-Yu Zhen-Fu",
    "范余振富",
    "飯魚正負",
    "fan._.yuu",
    "fanyuuu2006",
    "范振富",
    "personal website",
    "個人網站",
    "portfolio",
    "web developer",
    "frontend developer",
    "Taiwan developer",
    "NTUST",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "啦八機",
    "LaBaG",
    "超級阿禾",
    "陳敬禾",
    "阿禾",
    "SuperHHH",
    "綠光阿瑋",
    "GreenWei",
    "皮卡丘",
    "PiKaChu",
    "拉霸機",
    "台科大",
    "臺科大",
    "台灣科技大學",
    "臺灣科技大學",
    "資訊管理系",
    "治平高中",
    "CPSHS",
    "電子商務科",
    "富光國中",
    "FGJH",
    "關西國小",
    "GSES",
    "關西",
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
  alternates:{
    canonical: "/",
  }
};
