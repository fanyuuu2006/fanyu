import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanyu.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/projects", "/guestbook", "/album"];
  const dynamicRoutes: string[] = [];

  const years = await fetcher<string[]>(`${baseUrl}/api/album`);

  for (const year of years) {
    const events = await fetcher<string[]>(`${baseUrl}/api/album/${slugify(year)}`);

    for (const event of events) {
      const imgs = await fetcher<string[]>(
        `${baseUrl}/api/album/${slugify(year)}/${slugify(event)}`
      );
      dynamicRoutes.push(...imgs);
    }
  }

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));
}
