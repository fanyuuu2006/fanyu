import { education } from "./education";
import { portfolioItems, tagCategories } from "./portfolio";
import { site } from "./site";

const knowsAbout = [
  ...tagCategories.languages,
  ...tagCategories.frontend,
  ...tagCategories.backend,
  ...tagCategories.database,
  ...tagCategories.automation,
  ...tagCategories.visualization,
  ...tagCategories.platforms,

  // 額外補充不是 Tag 的能力
  "Accessibility",
  "SEO",
  "Responsive Web Design",
  "Performance Optimization",
] as const;

export const personJsonLd = {
  "@id": site.url + "#person",
  "@context": "https://schema.org",
  "@type": "Person",
  name: "范余振富",
  alternateName: ["Fan Yu-Zhen-Fu", "范余振富", "飯魚", "FanYu"],
  birthDate: "2006-05-26",
  url: site.url,
  image: `${site.url}/images/fanyu.jpg`,
  jobTitle: ["Student Developer", "Frontend Developer", "Web Developer"],
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
  knowsAbout,
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
};

export const websiteJsonLd = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  "@id": `${site.url}#website`,

  url: site.url,

  name: site.title,

  description: site.description,

  inLanguage: "zh-TW",

  author: {
    "@id": `${site.url}#person`,
  },

  publisher: {
    "@id": `${site.url}#person`,
  },
};

export const webpageJsonLd = {
  "@id": site.url + "#webpage",
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: site.title,
  description: site.description,
  url: site.url,
  inLanguage: "zh-TW",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: portfolioItems.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        headline: project.title,
        name: project.title,
        url: project.links[0]?.url || project.links[1]?.url || site.url,
        thumbnailUrl: project.imageUrl,
        dateCreated: project.date,
        inLanguage: "zh-TW",
        author: {
          "@id": site.url + "#person",
        },
        description: project.overview,
        image: project.imageUrl,
        creator: {
          "@id": site.url + "#person",
        },
      },
    })),
  },
};
