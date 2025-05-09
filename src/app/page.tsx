import { AboutMeSection } from "@/components/Index/AboutMeSection/AboutMeSection";
import { ContactSection } from "@/components/Index/ContactSection/ContactSection";
import { ExperienceSection } from "@/components/Index/ExperienceSection/ExperienceSection";
import { HomeSection } from "@/components/Index/HomeSection/HomeSection";
import { PortfolioSection } from "@/components/Index/PortfolioSection/PortfolioSection";
import { SkillsSection } from "@/components/Index/SkillsSection/SkillsSection";

export default function Page() {
  return (
    <>
      <HomeSection />
      <AboutMeSection />
      <SkillsSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
