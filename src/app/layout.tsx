import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
export { metadata } from "./metadata";
import { Noto_Sans_SC } from "next/font/google";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin-ext"],
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
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Fan-Yu Zhen-Fu",
              alternateName: "FanYu",
              birthDate: "2006-05-26",
              url: "https://fanyu.vercel.app",
              image: "https://fanyu.vercel.app/GameShow.jpg",
              sameAs: [
                "https://github.com/fanyuuu2006",
                "https://www.instagram.com/fan._.yuuu",
                "https://www.facebook.com/share/1MpEQ1faFk/",
              ],
              jobTitle: "FullStack Developer",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "National Taiwan University of Science and Technology",
              },
              knowsAbout: ["Web Development", "TypeScript", "React", "Python"],
            }),
          }}
        />
      </head>
      <body className={`${notoSansSC.className}`}>
        <LanguageProvider>
          <Header />
          <main className="mt-24">{children}</main>
          <LanguageSwitchButton />
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
