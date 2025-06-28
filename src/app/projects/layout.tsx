import type { Metadata } from "next";
import { profile } from "@/libs/profile";
import Script from "next/script";

export const metadata: Metadata = {
  title: "專案 Project",
  description: "查看 FanYu 的開發作品集，包含前端、後端、全端專案展示",
  openGraph: {
    title: "專案 Project | FanYu",
    description: "查看 FanYu 的開發作品集，包含前端、後端、全端專案展示",
    url: `${profile.url}/projects`,
    images: [
      {
        url: `${profile.url}/Portfolio/aojiao.jpg`,
        alt: "FanYu Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "專案 Project | FanYu",
    description: "查看 FanYu 的開發作品集，包含前端、後端、全端專案展示",
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
            description: "查看 FanYu 的開發作品集，包含前端、後端、全端專案展示",
            url: `${profile.url}/projects`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: profile.portfolio.projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  name: project.title.english,
                  description: project.about.english,
                  url: project.links.find((l) => l.category === "demo")?.href ?? profile.url,
                  image: `${profile.url}${project.imageSrc}`,
                  dateCreated: `${project.time}-01`,
                  author: {
                    "@type": "Person",
                    name: profile.name.english,
                    url: profile.url,
                  },
                },
              })),
            },
          }),
        }}
      />
      {children}
    </>
  );
}
