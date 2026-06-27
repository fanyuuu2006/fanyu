import { ReadMeSection } from "@/components/portfolio/[title]/ReadMeSection";
import { HeadingSection } from "@/components/HeadingSection";
import { portfolioItems } from "@/libs/portfolio";
import { deslugify } from "@/utils/url";
import { GiscusSection } from "@/components/portfolio/[title]/GiscusSection";
import { HeroSection } from "@/components/portfolio/[title]/HeroSection";

export default async function Portfolio(
  props: PageProps<"/portfolio/[title]">,
) {
  const { title } = await props.params;

  const portfolioItem = portfolioItems.find(
    (item) => item.title === deslugify(title),
  );

  if (!portfolioItem) {
    return (
      <HeadingSection
        title="作品不存在"
        description="找不到對應的作品，請確認網址是否正確。"
      />
    );
  }

  return (
    <>
      <HeroSection item={portfolioItem} />
      <ReadMeSection item={portfolioItem} />
      <GiscusSection item={portfolioItem} />
    </>
  );
}
