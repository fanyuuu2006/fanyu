import type { Metadata } from "next";
import { profile } from "@/libs/profile";

export const metadata: Metadata = {
  title: "留言板 Guestbook",
  description: "歡迎在 FanYu 的個人網站留言，分享您的想法和建議",
  openGraph: {
    title: "留言板 Guestbook | FanYu",
    description: "歡迎在 FanYu 的個人網站留言，分享您的想法和建議",
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
    title: "留言板 Guestbook | FanYu",
    description: "歡迎在 FanYu 的個人網站留言，分享您的想法和建議",
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
