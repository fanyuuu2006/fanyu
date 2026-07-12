import { site } from "../site";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.title,
  description: site.description,
  inLanguage: "zh-TW",
  author: { "@id": `${site.url}#person` },
  publisher: { "@id": `${site.url}#person` },
} as const;
