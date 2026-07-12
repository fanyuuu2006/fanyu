import { BlogPost } from "@/types/blog";
import { site } from "../site";

export function createBlogJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    url: `${site.url}/blog`,
    name: `${site.title} - Blog`,
    description: "技術文章與開發筆記", // 依實際文案調整
    inLanguage: "zh-TW",
    author: { "@id": `${site.url}#person` },
    publisher: { "@id": `${site.url}#person` },
    blogPost: posts
      .filter((p) => p.slug) // 保險起見
      .map((post) => ({
        "@id": `${site.url}/blog/${post.slug}#blogposting`,
      })),
  };
}
export function createBlogPostingJsonLd(post: BlogPost) {
  const postUrl = `${site.url}/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `${site.url}${post.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#blogposting`,
    headline: post.title,
    name: post.title,
    description: post.description || post.overview,
    url: postUrl,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date, // 若之後有獨立的更新時間欄位，改用該欄位
    inLanguage: "zh-TW",
    keywords: post.tags.join(", "),
    // Google 建議提供，用來估算閱讀時間的輔助資訊
    timeRequired: `PT${post.readingTime}M`,
    wordCount: post.content.replace(/\s+/g, "").length,
    isPartOf: { "@id": `${site.url}/blog#blog` },
    author: { "@id": `${site.url}#person` },
    publisher: { "@id": `${site.url}#person` },
    mainEntityOfPage: { "@id": `${postUrl}#webpage` },
  };
}
