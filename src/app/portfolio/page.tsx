import { HeadingSection } from "@/components/HeadingSection";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export default function Portfolio() {
  return (
    <>
      <HeadingSection
        title="作品集"
        description="展示飯魚（范余振富）參與開發的專案與作品。"
      />
      <PortfolioPage />
    </>
  );
}
