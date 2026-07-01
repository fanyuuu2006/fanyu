// app/sitemap.ts
import { slugify } from "@/utils/url";
import { MetadataRoute } from "next";
import { site } from "@/libs/site";
import { portfolioItems } from "@/libs/portfolio";
import { routes } from "@/libs/routes";

// 讓 sitemap 能靜態生出來（重要）
export const revalidate = 3600;

const baseUrl = site.url;

/* ------------------------------
   產生 sitemap
--------------------------------*/
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  // 專案頁面
  for (const project of portfolioItems) {
    dynamicRoutes.push({
      url: `${baseUrl}/portfolio/${slugify(project.title)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  /* ------------------------------
    靜態頁面
  --------------------------------*/
  const staticList: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticList, ...dynamicRoutes];
}
