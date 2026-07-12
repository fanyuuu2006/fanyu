import { BackToTopButton } from "@/components/BackToTopButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans_SC } from "next/font/google";
export { metadata } from "./metadata";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { JsonLd } from "@/components/JsonLd";
import { personJsonLd } from "@/libs/jsonLd/person";
import { websiteJsonLd } from "@/libs/jsonLd/website";
const jsonLd = [personJsonLd, websiteJsonLd];
// Google Analytics ID
const MEASUREMENT_ID = "G-3SGK402751";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        {/* Preconnect 到外部資源以提升效能 */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch 到可能訪問的外部連結 */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//vercel.app" />

        {/* JSON-LD 結構化資料 */}
        {jsonLd.map((schema, index) => (
          <JsonLd key={index} data={schema} />
        ))}
      </head>

      <body className={notoSansSC.className} suppressHydrationWarning>
        <ThemeProvider>
          <Header className="fixed top-0 w-full z-99999" />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTopButton className="fixed bottom-4 right-4 z-999" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={MEASUREMENT_ID} />
      </body>
    </html>
  );
}
