import { MainSection } from "@/components/album/MainSection";
import * as album from "@/utils/album";

export default async function Page() {
  const years = await album.years();

  const data = await Promise.all(
    years.map(async (year) => {
      const events = await album.events(year);

      const eventData = await Promise.all(
        events.map(async (e) => {
          const items = await album.items(year, e.name || "其他");
          return { ...e, items };
        })
      );

      return { year, events: eventData };
    })
  );
  return <MainSection data={data} />;
}
