import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { createBlogPostingJsonLd } from "@/libs/jsonLd/blog";
import { getPost } from "@/utils/blog";
import { HeroSection } from "@/components/blog/[slug]/HeroSection";
import { ContentSection } from "@/components/blog/[slug]/ContentSection";
import { TocNavigation } from "@/components/blog/[slug]/TocNavigation";
import { getMarkdownOutline } from "@/utils/markdown";

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const outline = getMarkdownOutline(post.content);
  
  return (
    <>
      <JsonLd data={createBlogPostingJsonLd(post)} />
      <HeroSection post={post} />
      <TocNavigation outline={outline} />
      <ContentSection content={post.content} />
    </>
  );
}
