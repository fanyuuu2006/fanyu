import { AboutMeSection } from "@/components/Index/AboutMeSection/AboutMeSection";
import { ContactSection } from "@/components/Index/ContactSection/ContactSection";
import { ExperienceSection } from "@/components/Index/ExperienceSection/ExperienceSection2";
import { HeroSection } from "@/components/Index/HeroSection/HeroSection";
import { PortfolioSection } from "@/components/Index/PortfolioSection/PortfolioSection";
import { SkillsSection } from "@/components/Index/SkillsSection/SkillsSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
