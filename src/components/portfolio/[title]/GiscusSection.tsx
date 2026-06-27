// GiscusSection.tsx
"use client";
import { PortfolioItem } from "@/types";
import Giscus from "@giscus/react";

type GiscusSectionProps = {
  item: PortfolioItem;
};

export const GiscusSection = ({ item }: GiscusSectionProps) => {
  const { github } = item;
  if (!github?.giscus) return null;

  return (
    <section>
      <div className="container">
        <Giscus
          repo={github.repo}
          repoId={github.giscus.repoId}
          category="Announcements"
          categoryId={github.giscus.categoryId}
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="transparent_dark"
          lang="zh-TW"
          loading="lazy"
        />
      </div>
    </section>
  );
};
