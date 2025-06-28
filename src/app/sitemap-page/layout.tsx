import type { Metadata } from "next";
import { profile } from "@/libs/profile";

export const metadata: Metadata = {
  title: "網站地圖 Sitemap",
  description: "FanYu 個人網站的完整導覽地圖，包含所有頁面和相簿分類",
  openGraph: {
    title: "網站地圖 Sitemap | FanYu",
    description: "FanYu 個人網站的完整導覽地圖，包含所有頁面和相簿分類",
    url: `${profile.url}/sitemap-page`,
  },
  alternates: {
    canonical: "/sitemap-page",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 