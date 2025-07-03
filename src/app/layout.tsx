import "@/styles/globals.css";
import { Header } from "@/components/Header/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
export { metadata } from "./metadata";
import { Noto_Sans_SC } from "next/font/google";
import { profile } from "@/libs/profile";
import { AlbumProvider } from "@/contexts/AlbumContext";

// 評估id
const measurementID = "G-3SGK402751";

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
        {/* 語言和地區標籤 */}
        <link rel="alternate" href={profile.url} hrefLang="zh-TW" />
        <link rel="alternate" href={profile.url} hrefLang="en" />
        <link rel="alternate" href={profile.url} hrefLang="x-default" />
        
        {/* Preconnect 到外部資源以提升效能 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch 到可能訪問的外部連結 */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//vercel.app" />
        
        {/** 結構化資料 */}
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name.english,
              alternateName: [profile.nickname.english, profile.nickname.chinese, profile.name.chinese],
              birthDate: profile.birthday,
              url: profile.url,
              image: `${profile.url}/GameShow.jpg`,
              sameAs: Object.values(profile.contact)
                .flat()
                .map((item) => item.href),
              jobTitle: ["Student Developer", "Frontend Developer", "Web Developer"],
              description: profile.description.english,
              nationality: {
                "@type": "Country",
                name: "Taiwan"
              },
              homeLocation: {
                "@type": "Place",
                name: "Taipei, Taiwan"
              },
              alumniOf: profile.experience.education.map(edu => ({
                "@type": "CollegeOrUniversity",
                name: edu.name.english,
                alternateName: edu.name.chinese
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
                "Responsive Design"
              ],
              knowsLanguage: [
                {
                  "@type": "Language",
                  name: "Chinese",
                  alternateName: "zh-TW"
                },
                {
                  "@type": "Language", 
                  name: "English",
                  alternateName: "en"
                }
              ]
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
              name: `${profile.nickname.english} Personal Portfolio`,
              description:
                "Personal portfolio site of Fan-Yu Zhen-Fu showcasing projects and skills.",
              url: "https://fanyu.vercel.app",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: profile.portfolio.projects.map(
                  (project, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "CreativeWork",
                      headline: project.title.english,
                      name: project.title.english,
                      description: project.about.english,
                      url:
                        project.links.find((l) => l.category === "demo")
                          ?.href ?? profile.url,
                      thumbnailUrl: `${profile.url}${project.imageSrc}`,
                      dateCreated: `${project.time}-01`,
                      inLanguage: "en",
                      programmingLanguage: project.tags[0],
                      author: {
                        "@type": "Person",
                        "@id": profile.url,
                        name: profile.name.english,
                        url: profile.url,
                      },
                    },
                  })
                ),
              },
            }),
          }}
        />
        {/* GA Script */}
        <Script
          id="googletagmanager"
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementID}');
          `}
        </Script>
      </head>
      <body className={`${notoSansSC.className} flex flex-col min-h-screen`}>
        <LanguageProvider>
          <AlbumProvider>
            <Header />
            <main className="mt-24 flex-1">{children}</main>
            <LanguageSwitchButton />
            <Footer />
          </AlbumProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
