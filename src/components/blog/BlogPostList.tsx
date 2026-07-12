"use client";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { AnimatePresence, motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import { BlogPostCard } from "./BlogPostCard";

type BlogPostListProps = React.HTMLAttributes<HTMLElement> & {
  posts: BlogPost[];
  animationKey: string;
};
export const BlogPostList = ({
  posts,
  animationKey,
  ...rest
}: BlogPostListProps) => {
  return (
    <section {...rest}>
      <div className="container flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {posts.length > 0 ? (
            <motion.div
              initial="hiddenLeft"
              animate="show"
              exit="hiddenRight"
              variants={staggerContainer}
              key={animationKey}
              className="w-full flex flex-col gap-4"
            >
              {/* 列表 */}
              {posts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={fadeInItem}
                >
                  <BlogPostCard post={post} />
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              variants={fadeInItem}
              className="py-16 text-center"
            >
              <div className="mx-auto max-w-md rounded-2xl border border-(--border)/60 bg-(--secondary-background)/50 px-6 py-8 text-(--muted)">
                <p className="text-base font-medium text-(--foreground)">
                  沒有符合條件的文章
                </p>
                <p className="mt-2 text-sm leading-7">
                  試著清除部分標籤，或改用其他關鍵字重新搜尋。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
