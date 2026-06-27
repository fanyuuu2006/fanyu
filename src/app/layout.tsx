import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { education } from "@/libs/education";
import { portfolioItems } from "@/libs/portfolio";
import { site } from "@/libs/site";
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

        {/* JSON-LD 結構化資料 */}
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "范余振富",
              alternateName: ["Fan Yu-Zhen-Fu", "范余振富", "飯魚", "FanYu"],
              birthDate: "2006-05-26 UTC+8",
              url: site.url,
              image: `${site.url}/GameShow.jpg`,
              jobTitle: [
                "Student Developer",
                "Frontend Developer",
                "Web Developer",
              ],
              description: site.description,
              nationality: {
                "@type": "Country",
                name: "Taiwan",
              },
              homeLocation: {
                "@type": "Place",
                name: "Taipei, Taiwan",
              },
              alumniOf: education.map((edu) => ({
                "@type": "CollegeOrUniversity",
                name: edu.title,
                alternateName: edu.subtitle,
              })),
              knowsAbout: [
                "Web Development",
                "Frontend Development",
                "TypeScript",
                "JavaScript",
                "React",
                "Next.js",
                "Python",
                "Node.js",
                "Tailwind CSS",
                "UI/UX Design",
                "Responsive Design",
              ],
              knowsLanguage: [
                {
                  "@type": "Language",
                  name: "Chinese",
                  alternateName: "zh-TW",
                },
                {
                  "@type": "Language",
                  name: "English",
                  alternateName: "en",
                },
              ],
            }),
          }}
        />

        <Script
          id="webpage-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: site.title,
              description:
                "Personal portfolio site of Fan-Yu Zhen-Fu showcasing projects and skills.",
              url: "https://fanyu.vercel.app",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: portfolioItems.map((project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "CreativeWork",
                    headline: project.title,
                    name: project.title,
                    url:
                      project.links[0]?.url ||
                      project.links[1]?.url ||
                      site.url,
                    thumbnailUrl: project.imageUrl,
                    dateCreated: project.date,
                    inLanguage: "en",
                    programmingLanguage: project.tags[0],
                    author: {
                      "@type": "Person",
                      "@id": site.url,
                      name: "范余振富",
                      url: site.url,
                    },
                  },
                })),
              },
            }),
          }}
        />

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
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
