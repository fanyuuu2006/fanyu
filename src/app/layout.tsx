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
        {/** 結構化資料 */}
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name.english,
              alternateName: profile.nickname.english,
              birthDate: profile.birthday,
              url: profile.url,
              image: `${profile.url}/GameShow.jpg`,
              sameAs: Object.values(profile.contact)
                .flat()
                .map((item) => item.href),
              jobTitle: "Student Developer",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: profile.experience.education.sort(
                  (a, b) =>
                    new Date(b.duration.start).getTime() -
                    new Date(a.duration.start).getTime()
                )[0].name.english,
              },
              knowsAbout: [
                "Web Development",
                "TypeScript",
                "React",
                "Python",
                "Node.js",
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
          <Header />
          <main className="mt-24 flex-1">{children}</main>
          <LanguageSwitchButton />
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
