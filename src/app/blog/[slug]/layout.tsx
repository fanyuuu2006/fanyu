import type { Metadata } from "next";
import { site } from "@/libs/site";
import { getPost } from "@/utils/blog";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: PageProps<"/blog/[slug]">["params"];
}>;

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "文章不存在",
      description: "找不到對應的文章，請確認網址是否正確。",
    };
  }

  const title = `${post.title} | ${site.title}`;
  const description = post.description || post.overview;

  const image = post.image?.startsWith("http")
    ? post.image
    : `${site.url}${post.image}`;
  const url = `${site.url}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: [...site.keywords, ...post.tags],

    authors: [{ name: "范余振富", url: site.url }],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: site.title,
      locale: "zh_TW",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          width: 1200,
          height: 630,
          url: image,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
