import { education } from "../education";
import { tagCategories } from "../portfolio";
import { site } from "../site";

const knowsAbout = [
  ...tagCategories.languages,
  ...tagCategories.frontend,
  ...tagCategories.backend,
  ...tagCategories.database,
  ...tagCategories.automation,
  ...tagCategories.visualization,
  ...tagCategories.platforms,
  "Accessibility",
  "SEO",
  "Responsive Web Design",
  "Performance Optimization",
] as const;

export const personJsonLd = {
  "@id": `${site.url}#person`,
  "@context": "https://schema.org",
  "@type": "Person",
  name: "范余振富",
  alternateName: ["Fan Yu-Zhen-Fu", "范余振富", "飯魚", "FanYu"],
  birthDate: "2006-05-26",
  url: site.url,
  image: `${site.url}/images/fanyu.jpg`,
  jobTitle: ["Student Developer", "Frontend Developer", "Web Developer"],
  description: site.description,
  nationality: { "@type": "Country", name: "Taiwan" },
  homeLocation: { "@type": "Place", name: "Taipei, Taiwan" },
  alumniOf: education.map((edu) => ({
    "@type": "CollegeOrUniversity",
    name: edu.title,
    alternateName: edu.subtitle,
  })),
  knowsAbout,
  knowsLanguage: [
    { "@type": "Language", name: "Chinese", alternateName: "zh-TW" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
} as const;
