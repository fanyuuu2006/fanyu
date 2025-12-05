import { MainSection } from "@/components/my/MainSection";
import { randomInt } from "@/utils";
import * as album from "@/utils/album";

export default async function Page() {
  const year = new Date().getFullYear();
  const items = await album.items(year.toString(), "其他");
  const i = randomInt(0, items.length - 1);

  return <MainSection bg={items[i].url} />;
}
