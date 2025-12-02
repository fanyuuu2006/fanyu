// app/sitemap.ts
import { profile } from "@/libs/profile";
import { slugify } from "@/utils/url";
import { MetadataRoute } from "next";
import { routes as staticRoutes } from "@/components/routes";
import { fetcher } from "@/utils";
import { Album } from "@/types/album";

// 讓 sitemap 能靜態生出來（重要）
export const revalidate = 3600;

const baseUrl = profile.url;

/* ------------------------------
   API：統一用這裡重新定義的版本
--------------------------------*/
const getYears = async () =>
  fetcher<Album[number]["year"][]>(`${profile.url}/api/album`, {
    next: { revalidate },
  });

const getEvents = async (year: string) =>
  fetcher<Album[number]["events"][number][]>(
    `${profile.url}/api/album/${slugify(year)}`,
    { next: { revalidate } }
  );

/* ------------------------------
   產生 sitemap
--------------------------------*/
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const years = await getYears();

    for (const year of years) {
      const events = await getEvents(year);

      // 年份頁面
      dynamicRoutes.push({
        url: `${baseUrl}/album/${slugify(year)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });

      // 活動頁面
      for (const event of events) {
        dynamicRoutes.push({
          url: `${baseUrl}/album/${slugify(year)}/${slugify(
            event.name || "其他"
          )}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }

    // 專案頁面
    for (const project of profile.portfolio.projects) {
      dynamicRoutes.push({
        url: `${baseUrl}/projects/${slugify(project.title.english)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch (err) {
    console.error("Error generating sitemap:", err);
  }

  /* ------------------------------
    靜態頁面
  --------------------------------*/
  const staticList: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticList, ...dynamicRoutes];
}
