import type { Metadata } from "next";
import { site } from "@/libs/site";

const title = "留言板";
const description = "在飯魚的留言板分享您的想法、建議與回饋，歡迎交流網站內容、技術文章與開發心得。";

const image = `${site.url}/images/fanyu.jpg`;
const url = `${site.url}/guestbook`;

export const metadata: Metadata = {
  title,
  description,
  keywords: site.keywords,

  alternates: {
    canonical: "/guestbook",
  },

  openGraph: {
    title: `${site.title}｜${title}`,
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
    title: `${site.title}｜${title}`,
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