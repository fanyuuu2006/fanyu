import type { Metadata } from "next";
import { profile } from "@/libs/profile";

const description =
  "探索 FanYu 的個人相簿，記錄生活中的精彩時刻、活動回憶與成長足跡。包含學習經歷、活動參與、旅遊紀錄等珍貴回憶。";

export const metadata: Metadata = {
  title: {
    template: "%s | 相簿 Album",
    default: "相簿 Album",
  },
  description,
  keywords: [
    "FanYu",
    "飯魚",
    "個人相簿",
    "生活記錄",
    "活動照片",
    "回憶",
    "攝影作品",
    "學習歷程",
    "成長足跡",
    "photo album",
    "personal gallery",
    "memories",
  ],
  authors: [
    { name: profile.nickname.chinese },
    { name: profile.nickname.english },
  ],
  creator: `${profile.nickname.chinese} (${profile.nickname.english})`,
  publisher: `${profile.nickname.chinese} Personal Website`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "相簿 Album | FanYu",
    description,
    url: `${profile.url}/album`,
    siteName: `${profile.nickname.chinese} ${profile.nickname.english}`,
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: `${profile.url}/GameShow.jpg`,
        width: 1200,
        height: 630,
        alt: "FanYu Photo Album - 飯魚的個人相簿",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fanyu",
    creator: "@fanyu",
    title: "相簿 Album | FanYu",
    description,
    images: [
      {
        url: `${profile.url}/GameShow.jpg`,
        alt: "FanYu Photo Album - 飯魚的個人相簿",
      },
    ],
  },
  alternates: {
    canonical: `${profile.url}/album`,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      
      {children}
    </>
  );
}
