import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { HeadingSection } from "@/components/HeadingSection";
import { JsonLd } from "@/components/JsonLd";
import { createBlogJsonLd } from "@/libs/jsonLd/blog";
import { getPosts } from "@/utils/blog";
import { Suspense } from "react";

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={createBlogJsonLd(posts)} />
      <HeadingSection
        title="部落格"
        description="飯魚（范余振富）在這裡分享程式開發、生活、學習與其他有趣的事物。"
      />
      <Suspense>
        <BlogExplorer posts={posts} />
      </Suspense>
    </>
  );
}
