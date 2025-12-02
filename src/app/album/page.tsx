import { MainSection } from "@/components/album/MainSection";
import { asyncPool } from "@/utils";
import * as album from "@/utils/album";

export default async function Page() {
  const years = await album.years();

  // === Step 1: 平行取得所有年份的 events ===
  const eventsByYear = await asyncPool(5, years, async (year) => {
    const events = await album.events(year);
    return { year, events };
  });

  // Step 2: 展開所有 items 任務
  const tasks = eventsByYear.flatMap(({ year, events }) =>
    events.map((e) => ({
      year,
      event: e,
      name: e.name || "其他",
    }))
  );
  // Step 3: 限制 items 的併發，例如 10
  const itemResults = await asyncPool(10, tasks, async (t) => {
    const items = await album.items(t.year, t.name);
    return { ...t, items };
  });

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
