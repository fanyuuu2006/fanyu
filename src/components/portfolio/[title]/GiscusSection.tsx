"use client";
import { PortfolioItem } from "@/types";
import Giscus from "@giscus/react";

type GiscusSectionProps = {
  github: PortfolioItem["github"];
};

export const GiscusSection = ({ github }: GiscusSectionProps) => {
  if (!github || !github.giscus) {
    return null;
  }
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
          lang={"zh-TW"}
          loading="lazy"
        />
      </div>
    </section>
  );
};
