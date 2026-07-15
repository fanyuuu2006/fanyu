import { useEffect, useState } from "react";

/**
 * 計算文章的閱讀進度(0~100)。
 * 文章的起點與總高度只在 mount 與 resize 時量測一次並快取,
 * scroll 時只用快取值做數學運算,避免每次捲動都觸發 layout 重算。
 */
export const useReadingProgress = (contentSelector: string) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(contentSelector);
    if (!article) return;

    let start = 0;
    let distance = 1;

    const measure = () => {
      start = article.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, article.offsetHeight - window.innerHeight);
    };

    let ticking = false;
    const updateProgress = () => {
      const ratio = ((window.scrollY - start) / distance) * 100;
      setProgress(Math.min(100, Math.max(0, ratio)));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    measure();
    updateProgress();

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [contentSelector]);

  return progress;
};
