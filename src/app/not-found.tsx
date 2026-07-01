import type { Metadata } from "next";
import { site } from "@/libs/site";

export const metadata: Metadata = {
  title: `頁面不存在 | ${site.title}`,
  description: "找不到您要瀏覽的頁面，請返回首頁或前往作品集、留言板。",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `頁面不存在 | ${site.title}`,
    description: "找不到您要瀏覽的頁面，請返回首頁或前往作品集、留言板。",
    url: site.url,
    type: "website",
    siteName: site.title,
    locale: "zh_TW",
  },
};

export default function NotFound() {
  return (
    <section>
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
          404 - 找不到頁面
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-(--muted)">
          抱歉，您所尋找的頁面不存在。
        </p>
      </div>
    </section>
  );
}
