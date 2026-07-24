import { POSTS_PATH } from "@/libs/blog";
import { BlogFrontMatter, BlogPost } from "@/types/blog";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const ZH_CHAR_REGEX = /[\u4e00-\u9fff]/g;

export const estimateReadingTime = (content: string) => {
  const zhChars = content.match(ZH_CHAR_REGEX)?.length ?? 0;
  const latinWords = content
    .replace(ZH_CHAR_REGEX, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const units = zhChars > latinWords ? zhChars / 500 : latinWords / 220;
  return Math.max(1, Math.ceil(units));
};

const parseFrontMatter = (
  slug: string,
  data: BlogFrontMatter,
  content: string,
): BlogPost | null => {
  if (!data.published) {
    return null;
  }

  const parsedDate = data.date ? new Date(data.date) : null;
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    console.warn(`[blog] "${slug}" 缺少有效的 date,已略過`);
    return null;
  }

  return {
    slug,
    title: data.title ?? "",
    overview: data.overview ?? "",
    description: data.description ?? "",
    date: parsedDate.toISOString(),
    tags: data.tags ?? [],
    readingTime: estimateReadingTime(content),
    content,
    image: data.image ?? "",
  };
};

let cachedPosts: BlogPost[] | null = null;
export const getPosts = (): BlogPost[] => {
  if (cachedPosts && process.env.NODE_ENV === "production") {
    return cachedPosts;
  }

  if (!fs.existsSync(POSTS_PATH)) {
    console.warn(`[blog] POSTS_PATH not存在: ${POSTS_PATH}`);
    return [];
  }

  const files = fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".md"));

  const posts = files
    .map((file): BlogPost | null => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(POSTS_PATH, file);

      try {
        const source = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(source) as {
          data: BlogFrontMatter;
          content: string;
        };
        return parseFrontMatter(slug, data, content);
      } catch (err) {
        console.error(`[blog] 解析 "${file}" 失敗,已略過:`, err);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cachedPosts = posts;
  return posts;
};
export const getPost = (slug: string): BlogPost | null => {
  // production 且已有快取時，直接從快取撈，避免重複讀檔
  if (cachedPosts && process.env.NODE_ENV === "production") {
    return cachedPosts.find((post) => post.slug === slug) ?? null;
  }

  const fullPath = path.join(POSTS_PATH, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const source = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(source) as {
      data: BlogFrontMatter;
      content: string;
    };
    return parseFrontMatter(slug, data, content);
  } catch (err) {
    console.error(`[blog] 解析 "${slug}.md" 失敗:`, err);
    return null;
  }
};

export const getAdjacentPosts = (
  slug: string,
): {
  previous: BlogPost | null;
  next: BlogPost | null;
} => {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  const previous = index < posts.length - 1 ? posts[index + 1] : null;
  const next = index > 0 ? posts[index - 1] : null;
  return { previous, next };
};
