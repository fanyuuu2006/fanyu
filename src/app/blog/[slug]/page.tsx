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
        <div className="container flex flex-col gap-6 lg:flex-row lg:justify-center lg:gap-8">
          <div className="min-w-0 flex-1 max-w-180">
            <HeroSection post={post} />

            {outline.length > 0 && (
              <details className="group mt-6 card rounded-xl p-4 lg:hidden">
                <summary
                  className="cursor-pointer font-medium text-(--foreground)"
                  aria-expanded="false"
                  aria-controls="mobile-toc"
                >
                  目錄
                </summary>
                <TableOfContents
                  id="mobile-toc"
                  className="p-2"
                  outline={outline}
                />
              </details>
            )}

            <BlogMarkdown className="py-6 md:py-8">{post.content}</BlogMarkdown>
          </div>

          {outline.length > 0 && (
            <aside className="hidden shrink-0 lg:block lg:w-72">
              <TableOfContents
                className="sticky z-500 top-24 p-4 max-h-[calc(100vh-6rem)] overflow-y-auto"
                outline={outline}
              />
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
