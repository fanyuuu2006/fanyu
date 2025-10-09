import { MainSection } from "@/components/album/MainSection";
import album from "@/utils/album";

export default async function Page() {
  const years = await album.years();

  // 並行抓取所有年份與事件封面圖
  const data = await Promise.all(
    years.map(async (year) => {
      const events = await album.events(year);

      const eventData = await Promise.all(
        events.map(async (name) => {
          const images = await album.images(year, name);
          return { name, images };
        })
      );

      return { year, events: eventData };
    })
  );

  return <MainSection data={data} />;
}
