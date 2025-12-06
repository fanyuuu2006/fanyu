import { MainSection } from "@/components/my/MainSection";
import { randomInt } from "@/utils";
import * as album from "@/utils/album";

export default async function Page() {
  const year = new Date().getFullYear();

  const items = await album.items(year.toString(), "其他").catch(() => []);

  if (!items || items.length === 0) {
    return <MainSection bg="/cbg.jpg" />;
  }

  const item = items[randomInt(0, items.length - 1)];

  const bg = item.mimeType?.startsWith("video") ? item.thumbnailLink : item.url;

  return <MainSection bg={bg || ""} />;
}
