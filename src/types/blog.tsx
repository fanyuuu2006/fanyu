export type BlogFrontMatter = Partial<{
  title: string;
  overview: string;
  description: string;
  date: string;
  tags: string[];
  published: string;
  image: string;
}>;

export type BlogPost = {
  slug: string;
  title: string;
  overview: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  content: string;
};
