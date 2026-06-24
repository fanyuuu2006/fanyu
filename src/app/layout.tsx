import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans_SC } from "next/font/google";
import Script from "next/script";
export { metadata } from "./metadata";

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
    <html lang="en">
      <head>
        {/* Preconnect 到外部資源以提升效能 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch 到可能訪問的外部連結 */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//vercel.app" />

        {/* GA Script */}
        <Script
          id="googletagmanager"
          src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            })
          `}
        </Script>
      </head>
      <body className={notoSansSC.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
