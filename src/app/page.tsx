import { AboutMeSection } from "@/components/Index/AboutMeSection";
import { HomeSection } from "@/components/Index/HomeSection";
import { PortfolioSection } from "@/components/Index/PortfolioSection";
import { SkillsSection } from "@/components/Index/SkillsSection";

export default function Home() {
  return (
    <>
      <HomeSection />
      <AboutMeSection />
      <SkillsSection/>
      <PortfolioSection/>
    </>
  );
}
