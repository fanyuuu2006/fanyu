import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "留言板 Guestbook",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
