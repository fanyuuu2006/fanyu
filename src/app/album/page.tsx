import { MainSection } from "@/components/album/MainSection";
import * as album from "@/utils/album";

export default async function Page() {
  const years = await album.years();

  const data = await Promise.all(
    years.map(async (year) => {
      const events = await album.events(year);

      const eventsWithItems = await Promise.all(
        events.map(async (event) => {
          const items = await album.items(year, event.name || "其他");
          return { ...event, items };
        })
      );

      return { year, events: eventsWithItems };
    })
  );

  return <MainSection data={data} />;
}
