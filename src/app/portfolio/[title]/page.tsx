import { ReadMeSection } from "@/components/portfolio/[title]/ReadMeSection";
import { getGithubReadMe } from "@/utils/github";
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

  const repo = portfolioItem.github?.repo;

  const readMeContent = repo ? await getGithubReadMe(repo) : null;

  return (
    <>
      <HeroSection item={portfolioItem} />
      {readMeContent && <ReadMeSection>{readMeContent}</ReadMeSection>}
      <GiscusSection github={portfolioItem.github} />
    </>
  );
}
