import type { Metadata } from "next";
import { profile } from "@/libs/profile";

export const metadata: Metadata = {
  title: {
    template: "%s | 相簿 Album",
    default: "相簿 Album",
  },
  description: "瀏覽 FanYu 的生活相簿，記錄精彩時刻和活動回憶",
  openGraph: {
    title: "相簿 Album | FanYu",
    description: "瀏覽 FanYu 的生活相簿，記錄精彩時刻和活動回憶",
    url: `${profile.url}/album`,
    images: [
      {
        url: `${profile.url}/GameShow.jpg`,
        alt: "FanYu Photo Album",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "相簿 Album | FanYu",
    description: "瀏覽 FanYu 的生活相簿，記錄精彩時刻和活動回憶",
  },
  alternates: {
    canonical: "/album",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
