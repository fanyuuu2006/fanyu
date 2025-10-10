import { profile } from "@/libs/profile";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";

const years = async () =>
  fetcher<string[]>(`${profile.url}/api/album`, { cache: "no-store" });

const events = async (year: string) =>
  fetcher<string[]>(`${profile.url}/api/album/${slugify(year)}`, {
    cache: "no-store",
  });

const images = async (year: string, eventName: string) =>
  fetcher<string[]>(
    `${profile.url}/api/album/${slugify(year)}/${slugify(eventName)}`,
    {
      cache: "no-store",
    }
  );

const image = async (year: string, eventName: string, index: number) =>
  fetcher<string>(
    `${profile.url}/api/album/${slugify(year)}/${slugify(eventName)}/${index}`,
    { cache: "no-store" }
  );

const album = { years, events, images, image };
export default album;
