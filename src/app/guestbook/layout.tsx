import type { Metadata } from "next";
import { profile } from "@/libs/profile";

export const metadata: Metadata = {
  title: "留言板 Guestbook",
  description: `歡迎在${profile.nickname.chinese}的留言板留下您的訊息！Welcome to leave your message on ${profile.nickname.english}'s guestbook!`,
  keywords: profile.keywords,
  openGraph: {
    title: `${profile.nickname.chinese} - 留言板 | ${profile.nickname.english} - Guestbook`,
    description: `在${profile.nickname.chinese}的留言板分享您的想法和建議。Share your thoughts and suggestions on ${profile.nickname.english}'s guestbook.`,
    url: `${profile.url}/guestbook`,
    images: [
      {
        url: `${profile.url}/GameShow.jpg`,
        alt: "FanYu Guestbook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.nickname.chinese} - 留言板 | ${profile.nickname.english} - Guestbook`,
    description: `在${profile.nickname.chinese}的留言板分享您的想法和建議。Share your thoughts and suggestions on ${profile.nickname.english}'s guestbook.`,
  },
  alternates: {
    canonical: "/guestbook",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
