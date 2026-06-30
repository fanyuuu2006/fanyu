"use client";
import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import Giscus from "@giscus/react";
import { DivTitle } from "./DivTitle";
import { useTheme } from "@/contexts/ThemeContext";

type GiscusDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};

export const GiscusDiv = ({ item, className, ...rest }: GiscusDivProps) => {
  const { github } = item;
  const { theme } = useTheme();
  if (!github?.giscus) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)} {...rest}>
      <DivTitle>討論區</DivTitle>
      <div className="p-2">
        <Giscus
          repo={github.repo}
          repoId={github.giscus.repoId}
          category="Announcements"
          categoryId={github.giscus.categoryId}
          mapping="pathname"
          reactionsEnabled="1"
          strict="0"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang="zh-TW"
          loading="lazy"
        />
      </div>
    </div>
  );
};
