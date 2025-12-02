import { MainSection } from "@/components/album/MainSection";
import * as album from "@/utils/album";

export default async function Page() {
  const years = await album.years();

  // === Step 1: 平行取得所有年份的 events ===
  const eventsByYear = await Promise.all(
    years.map(async (year) => {
      const events = await album.events(year);
      return { year, events };
    })
  );

  // === Step 2: 平行取得所有 items（攤平成一層查詢）===
  const allItemsPromise = eventsByYear.flatMap(({ year, events, }) =>
    events.map(async (e) => {
      const name = e.name || "其他";
      const items = await album.items(year, name);
      return { year, event: e, items };
    })
  );

  const itemsResults = await Promise.all(allItemsPromise);

  // === Step 3: 重組結構 ===
  const data = years.map((year) => {
    const row = itemsResults.filter((r) => r.year === year);
    const events = row.map((r) => ({
      ...r.event,
      items: r.items,
    }));
    return { year, events };
  });

  return <MainSection data={data} />;
}
