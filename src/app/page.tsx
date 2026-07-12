import { AboutMeSection } from "@/components/index/AboutMeSection";
import { ContactSection } from "@/components/index/ContactSection";
import { ExperienceSection } from "@/components/index/ExperienceSection";
import { HeroSection } from "@/components/index/HeroSection";
import { PortfolioSection } from "@/components/index/PortfolioSection";
import { SkillsSection } from "@/components/index/SkillsSection";
import { JsonLd } from "@/components/JsonLd";
import { createHomePageJsonLd } from "@/libs/jsonLd/homePage";
import { createPortfolioItemListJsonLd } from "@/libs/jsonLd/portfolio";
import { portfolioItems } from "@/libs/portfolio";

export default function Home() {
  return (
    <>
      <JsonLd data={createHomePageJsonLd()} />
      <JsonLd data={createPortfolioItemListJsonLd(portfolioItems)} />
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
