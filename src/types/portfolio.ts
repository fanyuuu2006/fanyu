import { projectTagCategories } from "@/libs/projects";
import { LanguageContent } from "./language";
import { RepoString } from "./github";

export type ProjectLinkCategory = "demo" | "github" | "package";

export type ProjectTagCategory = keyof typeof projectTagCategories;
export type ProjectTag =
  (typeof projectTagCategories)[ProjectTagCategory][number];

export type ProjectItem = {
  imageSrc: string;
  title: LanguageContent<string>;
  links: { category: ProjectLinkCategory; href: string }[];
  time: string;
  about: LanguageContent<string>;
  description: LanguageContent<string[]>;
  tags: ProjectTag[];
  github?: {
    repo: RepoString;
    repoId: string;
    categoryId: string;
  };
};
