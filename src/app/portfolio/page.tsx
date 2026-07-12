import { HeadingSection } from "@/components/HeadingSection";
import { JsonLd } from "@/components/JsonLd";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";
import { createPortfolioItemListJsonLd } from "@/libs/jsonLd/portfolio";
import { portfolioItems } from "@/libs/portfolio";
import { Suspense } from "react";

export default function Portfolio() {
  return (
    <>
      <JsonLd data={createPortfolioItemListJsonLd(portfolioItems)} />
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
