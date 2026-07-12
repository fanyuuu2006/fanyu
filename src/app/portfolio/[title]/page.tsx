import { portfolioItems } from "@/libs/portfolio";
import { deslugify } from "@/utils/url";
import { HeroSection } from "@/components/portfolio/[title]/HeroSection";
import { PortfolioContentSection } from "@/components/portfolio/[title]/PortfolioContentSection";
import { JsonLd } from "@/components/JsonLd";
import { createPortfolioDetailJsonLd } from "@/libs/jsonLd/portfolio";
import { notFound } from "next/navigation";

export default async function Portfolio(
  props: PageProps<"/portfolio/[title]">,
) {
  const { title } = await props.params;

  const portfolioItem = portfolioItems.find(
    (item) => item.title === deslugify(title),
  );

  if (!portfolioItem) {
    notFound();
  }

  return (
    <>
      <JsonLd data={createPortfolioDetailJsonLd(portfolioItem)} />
      <HeroSection item={portfolioItem} />
      <PortfolioContentSection item={portfolioItem} />
    </>
  );
}
