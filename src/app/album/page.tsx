import { MainSection } from "@/components/album/MainSection";
import * as album from "@/utils/album";

export default async function Page() {
  const years = await album.years();

  //取得所有年份的 events ===
  const eventsByYear = await Promise.all(
    years.map(async (year) => {
      const events = await album.events(year);
      return { year, events };
    })
  );

  // Step 2: 展開所有 items 任務
  const tasks = eventsByYear.flatMap(({ year, events }) =>
    events.map((e) => ({
      year,
      event: e,
      name: e.name || "其他",
    }))
  );
  const itemResults = await Promise.all(
    tasks.map(async (t) => {
      const items = await album.items(t.year, t.name);
      return { ...t, items };
    })
  );

  // Step 4: 重組
  const data = years.map((year) => {
    const rows = itemResults.filter((r) => r.year === year);
    const events = rows.map((r) => ({
      ...r.event,
      items: r.items,
    }));
    return { year, events };
  });

  return <MainSection data={data} />;
}
