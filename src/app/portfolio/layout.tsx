import type { Metadata } from "next";
import { site } from "@/libs/site";

const title = "作品集";
const description = "飯魚（范余振富）的作品集，展示各種專案、作品與開發經驗，涵蓋前端、後端、全端及其他技術領域，呈現多樣化的技能與創意。";

const image = `${site.url}/images/fanyu.jpg`;
const url = `${site.url}/portfolio`;

export const metadata: Metadata = {
  title,
  description,
  keywords: site.keywords,

  alternates: {
    canonical: "/portfolio",
  },

  openGraph: {
    title: `${title} ｜ ${site.title}`,
    description,
    url,
    type: "website",
    siteName: site.title,
    locale: "zh_TW",
    images: [
      {
        url: image,
        alt: `${site.title} ${title}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${title} ｜ ${site.title}`,
    description,
    images: [image],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: LayoutProps) {
  return children;
}