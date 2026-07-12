import { site } from "../site";

export function createHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}#webpage`,
    url: site.url,
    name: site.title,
    description: site.description,
    inLanguage: "zh-TW",
    isPartOf: { "@id": `${site.url}#website` },
    about: { "@id": `${site.url}#person` },
    // 如果想保留关联，可以用 mainEntity 指向 ItemList 的 @id 而不是内嵌整包资料
    mainEntity: { "@id": `${site.url}/portfolio#itemlist` },
  };
}
