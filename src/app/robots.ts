import { routes } from "@/libs/routes";
import { site } from "@/libs/site";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/private/",
          "/_next/",
          "/.*", // 隱藏文件
        ],
      },
      {
        userAgent: "Googlebot",
        allow: routes.map((route) => route.url),
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: routes.map((route) => route.url),
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
