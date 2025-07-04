import type { Metadata } from "next";
import { profile } from "@/libs/profile";
import Script from "next/script";

export const metadata: Metadata = {
  title: "專案 Project",
  description: `${profile.nickname.chinese}的專案作品集，包含React、Next.js、TypeScript等前端開發專案。${profile.nickname.english}'s project portfolio featuring frontend development projects with React, Next.js, TypeScript and more.`,
  keywords: [
    "專案作品",
    "project portfolio",
    "React projects",
    "Next.js projects",
    "TypeScript projects",
    "前端專案",
    "網頁開發作品",
    "programming projects",
    "coding portfolio",
    "student developer projects",
    "Taiwan developer",
  ],
  openGraph: {
    title: `${profile.nickname.chinese} - 專案作品 | ${profile.nickname.english} - Projects`,
    description: `探索${profile.nickname.chinese}的程式開發作品，包含現代網頁應用程式、React專案等。Explore ${profile.nickname.english}'s programming projects including modern web applications and React projects.`,
    url: `${profile.url}/projects`,
    images: [
      {
        url: `${profile.url}/GameShow.jpg`,
        width: 1200,
        height: 630,
        alt: "FanYu Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.nickname.chinese} - 專案作品 | ${profile.nickname.english} - Projects`,
    description: `探索${profile.nickname.chinese}的程式開發作品，包含現代網頁應用程式、React專案等。Explore ${profile.nickname.english}'s programming projects including modern web applications and React projects.`,
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        id="projects-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "FanYu Projects Portfolio",
            description:
              "查看 FanYu 的開發作品集，包含前端、後端、全端專案展示",
            url: `${profile.url}/projects`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: profile.portfolio.projects.map(
                (project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "CreativeWork",
                    name: project.title.english,
                    description: project.about.english,
                    url:
                      project.links.find((l) => l.category === "demo")?.href ??
                      profile.url,
                    image: `${profile.url}${project.imageSrc}`,
                    dateCreated: `${project.time}-01`,
                    author: {
                      "@type": "Person",
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
      {children}
    </>
  );
}
