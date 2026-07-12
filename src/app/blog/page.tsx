import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { HeadingSection } from "@/components/HeadingSection";
import { getPosts } from "@/utils/blog";

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <HeadingSection
        title="部落格"
        description="飯魚（范余振富）在這裡分享程式開發、生活、學習與其他有趣的事物。"
      />
      <BlogExplorer posts={posts} />
    </>
  );
}
