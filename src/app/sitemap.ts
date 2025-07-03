import { profile } from "@/libs/profile";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";
import { MetadataRoute } from "next";

const baseUrl = profile.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/projects", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/guestbook", priority: 0.7, changeFreq: "daily" as const },
    { path: "/album", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/my", priority: 0.6, changeFreq: "monthly" as const },
  ];

  const dynamicRoutes: Array<{
    path: string;
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
    const years = await fetcher<string[]>(`${baseUrl}/api/album`);

    const yearEventMap = await Promise.all(
      years.map(async (year) => {
        const events = await fetcher<string[]>(
          `${baseUrl}/api/album/${slugify(year)}`
        );
        return { year, events };
      })
    );

    for (const { year, events } of yearEventMap) {
      // 年份頁面
      dynamicRoutes.push({
        path: `/album/${slugify(year)}`,
        priority: 0.7,
        changeFreq: "monthly",
      });

      // 活動頁面
      for (const event of events) {
        dynamicRoutes.push({
          path: `/album/${slugify(year)}/${slugify(event)}`,
          priority: 0.6,
          changeFreq: "yearly",
        });
      }
    }

    // 專案頁面
    for (const project of profile.portfolio.projects) {
      dynamicRoutes.push({
        path: `/projects/${slugify(project.title.english)}`,
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
      url: `${baseUrl}${route.path}`,
      lastModified: getLastModified(route.priority),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    })),
    ...dynamicRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: getLastModified(route.priority),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    })),
  ];

  return allRoutes;
}
