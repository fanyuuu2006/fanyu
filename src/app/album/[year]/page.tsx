import { MainSection } from "@/components/album/MainSection";
import { deslugify } from '@/utils/url';


interface PageProps {
  params: Promise<{ year: string }>;
}

export default async function Page({ params }: PageProps) {
  const { year } = await params;

  return <MainSection year={deslugify(year)} />;
}
