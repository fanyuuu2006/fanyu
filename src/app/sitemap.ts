import { profile } from "@/libs/profile";
import * as album from "@/utils/album";
import { slugify } from "@/utils/url";
import { MetadataRoute } from "next";
import { routes as staticRoutes } from "@/components/routes";

const baseUrl = profile.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes: Array<{
    pat: string;
    priority: number;
    changeFreq:
      | "yearly"
      | "monthly"
      | "weekly"
      | "daily"
      | "hourly"
      | "always"
      | "never";
  }> = [];

  try {
    const years = await album.years();

    const yearEventMap = await Promise.all(
      years.map(async (year) => {
        const events = await album.events(year);
        return { year, events };
      })
    );

    for (const { year, events } of yearEventMap) {
      // 年份頁面
      dynamicRoutes.push({
        pat: `/album/${slugify(year)}`,
        priority: 0.7,
        changeFreq: "monthly",
      });

      // 活動頁面
      for (const event of events) {
        dynamicRoutes.push({
          pat: `/album/${slugify(year)}/${slugify(event.name || "其他")}`,
          priority: 0.6,
          changeFreq: "monthly",
        });
      }
    }

    // 專案頁面
    for (const project of profile.portfolio.projects) {
      dynamicRoutes.push({
        pat: `/projects/${slugify(project.title.english)}`,
        priority: 0.8,
        changeFreq: "monthly",
      });
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  const getLastModified = (priority: number) => {
    // 高優先級的頁面使用較新的日期
    const daysAgo = priority >= 0.8 ? 1 : priority >= 0.6 ? 7 : 30;
    return new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * daysAgo);
  };

  const allRoutes = [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.url}`,
      lastModified: getLastModified(route.priority || 0.5),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...dynamicRoutes.map((route) => ({
      url: `${baseUrl}${route.pat}`,
      lastModified: getLastModified(route.priority),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    })),
  ];

  return allRoutes;
}
