import { profile } from "@/libs/profile";
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
        allow: ["/", "/projects", "/guestbook", "/album", "/my"],
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/projects", "/guestbook", "/album", "/my"],
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${profile.url}/sitemap.xml`,
    host: profile.url,
  };
}
