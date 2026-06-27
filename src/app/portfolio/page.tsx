import { HeadingSection } from "@/components/HeadingSection";
import { PortfolioFilterBar } from "@/components/portfolio/PortfolioFilterBar";
import { PortfolioList } from "@/components/portfolio/PortfolioList";
import { Suspense } from "react";

export default function Portfolio() {
  return (
    <>
      <HeadingSection
        title="作品集"
        description="展示飯魚（范余振富）參與開發的專案與作品。"
      />
      <Suspense fallback={null}>
        <PortfolioFilterBar />
        <PortfolioList />
      </Suspense>
    </>
  );
}
