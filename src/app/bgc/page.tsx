import { MainSection } from "@/components/bgc/MainSection";
import * as bgc from "@/utils/bgc";

export default async function Page() {
  const data = await bgc.assets();

  return <MainSection data={data} />;
}
