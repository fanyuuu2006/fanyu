import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { createBlogPostingJsonLd } from "@/libs/jsonLd/blog";
import { getPost } from "@/utils/blog";
import { HeroSection } from "@/components/blog/[slug]/HeroSection";
import { getMarkdownOutline } from "@/utils/markdown";
import { TableOfContents } from "@/components/blog/[slug]/TableOfContents";
import { BlogMarkdown } from "@/components/blog/[slug]/BlogMarkdown";

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
      <section className="mt-24">
        <div className="container flex gap-8 justify-center">
          <div className="min-w-0 flex-1 max-w-180">
            <HeroSection post={post} />
            <BlogMarkdown className="py-8">{post.content}</BlogMarkdown>
          </div>

          {outline.length > 0 && (
            <aside className="hidden shrink-0 lg:block lg:w-64">
              <TableOfContents
                className="sticky z-500 top-24 p-4"
                outline={outline}
              />
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
