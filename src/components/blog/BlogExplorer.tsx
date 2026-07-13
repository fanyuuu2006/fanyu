"use client";

import { PAGE_SIZE } from "@/hooks/useBlogParams";
import { useBlogParams } from "@/hooks/useBlogParams";
import { BlogPost } from "@/types/blog";
import { useMemo } from "react";
import { BlogFilterBar } from "./BlogFilterBar";
import { BlogPostList } from "./BlogPostList";
import { BlogPagination } from "./BlogPagination";

type BlogExplorerProps = React.HTMLAttributes<HTMLElement> & {
  posts: BlogPost[];
};
export const BlogExplorer = ({ posts }: BlogExplorerProps) => {
  const { params, setQuery, toggleSort, setPage } = useBlogParams();
  const { query, sort, page } = params;

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase();
    return posts
      .filter((post) => {
        if (q) {
          const searchable = [
            post.title,
            post.overview,
            post.date,
            ...post.tags,
          ]
            .join(" ")
            .toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        return sort === "newest" ? diff : -diff;
      });
  }, [query, posts, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedPosts = useMemo(
    () =>
      filteredPosts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredPosts, currentPage],
  );
  const animationKey = useMemo(
    () => [query, sort, currentPage].join("|"),
    [query, sort, currentPage],
  );

  return (
    <>
      <BlogFilterBar
        query={query}
        sort={sort}
        onQueryChange={setQuery}
        onSortToggle={toggleSort}
        className="sticky top-24 z-99"
      />
      <BlogPostList posts={pagedPosts} animationKey={animationKey} />
      <BlogPagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};
