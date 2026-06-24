"use client";
import Giscus from "@giscus/react";

export const GiscusSection = () => {
  return (
    <section>
      <div className="container">
          <Giscus
            repo="fanyuuu2006/fanyu"
            repoId="R_kgDOOeftZg"
            category="Announcements"
            categoryId="DIC_kwDOOeftZs4CqXwr"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme='transparent_dark'
            lang={"zh-TW"}
            loading="lazy"
          />
        </div>
    </section>
  );
};
