import { useEffect, useRef, useState } from "react";

export const useIsInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const ref = useRef(null);
  useEffect(() => {
    const target = ref.current; // ✅ 保存當下的 DOM 元素
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );
    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [options]);

  return {
    ref,
    isInView,
  };
};
