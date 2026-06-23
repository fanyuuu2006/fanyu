import { AboutMeSection } from "@/components/index/AboutMeSection";
import { ExperienceSection } from "@/components/index/ExperienceSection";
import { HeroSection } from "@/components/index/HeroSection";
import { PortfolioSection } from "@/components/index/PortfolioSection";
import { SkillsSection } from "@/components/index/SkillsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <PortfolioSection />
      <ExperienceSection />
    </>
  );
}
