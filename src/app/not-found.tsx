import { CustomLink } from "@/components/CustomLink";
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
    <section className="pt-28 pb-16 min-h-screen flex items-center">
      <div className="container flex justify-center">
        <div className="card secondary w-full max-w-3xl rounded-(--border-radius-lg) p-6 sm:p-10 text-center">
          <p className="text-(--muted) text-sm sm:text-base tracking-wide">
            ERROR 404
          </p>

          <h1 className="mt-3 text-[clamp(3rem,10vw,8rem)] font-bold leading-none text-transparent bg-clip-text bg-linear-to-r from-(--primary) to-(--secondary)">
            404
          </h1>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">
            找不到頁面
          </h2>

          <p className="mt-4 text-(--muted) text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            抱歉，您要瀏覽的頁面可能已被移動、刪除，或網址輸入有誤。
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <CustomLink
              href="/"
              className="btn primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-2.5 text-xl sm:text-2xl"
            >
              <span aria-hidden>⌂</span>
              <span>返回首頁</span>
            </CustomLink>
          </div>
        </div>
      </div>
    </section>
  );
}
