export type BlogFrontMatter = Partial<{
  title: string;
  overview: string;
  description: string;
  date: string | Date;
  tags: string[];
  published: boolean;
  image: string;
}>;

export type BlogPost = {
  slug: string;
  title: string;
  overview: string;
  description: string;
  date: string; // ISO 字串,方便排序與跨 Server/Client 傳遞
  tags: string[];
  readingTime: number;
  content: string;
  image: string;
};