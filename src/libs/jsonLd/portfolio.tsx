import { PortfolioItem } from "@/types";
import { site } from "../site";
import { slugify } from "@/utils/url";

export function createPortfolioItemListJsonLd(items: PortfolioItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/portfolio#itemlist`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${site.url}/portfolio/${slugify(item.title)}#creativework`,
        "@type": "CreativeWork",
        headline: item.title,
        name: item.title,
        url: item.links[0]?.url || item.links[1]?.url || site.url,
        thumbnailUrl: item.imageUrl,
        dateCreated: item.date,
        inLanguage: "zh-TW",
        author: { "@id": `${site.url}#person` },
        description: item.overview,
        image: item.imageUrl,
        creator: { "@id": `${site.url}#person` },
      },
    })),
  };
}

export function createPortfolioDetailJsonLd(item: PortfolioItem) {
  const slug = slugify(item.title);
  const detailUrl = `${site.url}/portfolio/${slug}`;
  const githubUrl = item.github
    ? `https://github.com/${item.github.repo}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${detailUrl}#work`,
    name: item.title,
    headline: item.title,
    description: item.overview,
    url: detailUrl,
    image: item.imageUrl,
    thumbnailUrl: item.imageUrl,
    dateCreated: item.date,
    inLanguage: "zh-TW",
    author: { "@id": `${site.url}#person` },
    creator: { "@id": `${site.url}#person` },
    keywords: item.tags.join(", "),
    ...(githubUrl && { codeRepository: githubUrl }),
    // links 沒有 type 區分，直接把所有連結列成 sameAs
    ...(item.links.length > 0 && {
      sameAs: item.links.map((l) => l.url),
    }),
  };
}
