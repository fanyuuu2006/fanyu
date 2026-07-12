import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { createBlogPostingJsonLd } from "@/libs/jsonLd/blog";
import { getPost } from "@/utils/blog";
import { HeroSection } from "@/components/blog/[slug]/HeroSection";
import { ContentSection } from "@/components/blog/[slug]/ContentSection";

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={createBlogPostingJsonLd(post)} />
      <HeroSection post={post} />
      <ContentSection content={post.content} />
    </>
  );
}
