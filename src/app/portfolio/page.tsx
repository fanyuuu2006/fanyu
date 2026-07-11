import { HeadingSection } from "@/components/HeadingSection";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";
import { Suspense } from "react";

export default function Portfolio() {
  return (
    <>
      <HeadingSection
        title="作品集"
        description="展示飯魚（范余振富）參與開發的專案與作品。"
      />
      <Suspense>
        <PortfolioExplorer />
      </Suspense>
    </>
  );
}
