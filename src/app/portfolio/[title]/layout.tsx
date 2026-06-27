import type { Metadata } from "next";
import { site } from "@/libs/site";
import { deslugify } from "@/utils/url";
import { portfolioItems } from "@/libs/portfolio";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: PageProps<"/portfolio/[title]">["params"];
}>;

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { title: rawTitle } = await params;
  const t = deslugify(rawTitle);
  const portfolioItem = portfolioItems.find((item) => item.title === t);

  if (!portfolioItem) {
    return {
      title: "作品不存在",
      description: "找不到對應的作品，請確認網址是否正確。",
    };
  }
  const title = `${portfolioItem.title} | ${site.title}`;
  const description = `${title}｜${portfolioItem.overview}`;

  const image = portfolioItem.imageUrl;
  const url = `/portfolio/${rawTitle}`;

  return {
    title,
    description,
    keywords: [...site.keywords, ...portfolioItem.tags],

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
      images: [
        {
          url: image,
          alt: `${title} - ${site.title}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${site.title}｜${title}`,
      description,
      images: [image],
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
