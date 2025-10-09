import { profile } from "@/libs/profile";
import album from "@/utils/album";
import { deslugify, slugify } from "@/utils/url";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ year: string; eventName: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year: rawYear, eventName: rawEventName } = await params;
  const year = deslugify(rawYear);
  const eventName = deslugify(rawEventName);

  const title = `${year} - ${eventName}`;
  const description = `查看 ${year} 年 ${eventName} 的相片集，記錄美好時刻與珍貴回憶`;
  const image = await album.image(year, eventName, 0);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 相簿 Album`,
      description,
      url: `${profile.url}/album/${slugify(year)}/${slugify(eventName)}`,
      type: "website",
      siteName: `${profile.nickname.chinese} ${profile.nickname.english}`,
      images: [
        {
          url: image,
          alt: `${year} ${eventName} - FanYu Photo Album`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 相簿 Album`,
      description,
      images: [
        {
          url: image,
          alt: `${year} ${eventName} - FanYu Photo Album`,
          type: "image/jpeg",
        },
      ],
    },
    alternates: {
      canonical: `${profile.url}/album/${slugify(year)}/${slugify(eventName)}`,
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
