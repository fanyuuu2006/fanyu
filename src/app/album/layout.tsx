import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 相簿 Album",
    default: "相簿 Album",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
