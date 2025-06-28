import { profile } from "@/libs/profile";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";
import { MetadataRoute } from "next";

const baseUrl = profile.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/projects", "/guestbook", "/album", "/my", "/sitemap-page"];
  const dynamicRoutes: string[] = [];

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
    for (const event of events) {
      dynamicRoutes.push(`/album/${slugify(year)}/${slugify(event)}`);
    }
  }

  const randomDate = () =>
    new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 10); // 前10天內隨機

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: randomDate(),
    changeFrequency: "daily",
    priority: 1,
  }));
}
