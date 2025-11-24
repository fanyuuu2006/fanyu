import { profile } from "@/libs/profile";
import { Album } from "@/types/album";
import { fetcher } from "@/utils";
import { slugify } from "@/utils/url";

export const years = async () =>
  fetcher<Album[number]["year"][]>(`${profile.url}/api/album`, {
    cache: "no-store",
  });

export const events = async (year: string) =>
  fetcher<Album[number]["events"][number]["name"][]>(
    `${profile.url}/api/album/${slugify(year)}`,
    {
      cache: "no-store",
    }
  );

export const items = async (year: string, eventName: string) =>
  fetcher<Album[number]["events"][number]["items"]>(
    `${profile.url}/api/album/${slugify(year)}/${slugify(eventName)}`,
    {
      cache: "no-store",
    }
  );

export const item = async (year: string, eventName: string, index: number) =>
  fetcher<Album[number]["events"][number]["items"][number]>(
    `${profile.url}/api/album/${slugify(year)}/${slugify(eventName)}/${index}`,
    { cache: "no-store" }
  );

