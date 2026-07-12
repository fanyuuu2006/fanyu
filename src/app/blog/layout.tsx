import type { Metadata } from "next";
import { site } from "@/libs/site";

const title = "部落格";
const description =
  "飯魚（范余振富）在這裡分享程式開發、生活、學習與其他有趣的事物。";

const image = `${site.url}/images/fanyu.jpg`;
const url = `${site.url}/blog`;

export const metadata: Metadata = {
  title,
  description,
  keywords: site.keywords,

  alternates: {
    canonical: "/blog",
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
  return <>{children}</>;
}
