import { useEffect, useRef, useState } from "react";

export interface ViewInit extends IntersectionObserverInit {
  times?: number; // 最多觀察次數
  direction?: "top" | "bottom"; // 方向選擇，根據需求可加入
}

export const useIsInView = ({
  times = Infinity,
  direction,
  ...rest
}: ViewInit = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const triggeredTimes = useRef(0); // 使用 ref 來追蹤觸發次數，不會引起重渲染

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      // 根據 direction 設定：判斷是否來自上方進入視口
      if (entry.isIntersecting) {
        // 判斷進入的方向
        const isComingFromTop =
          direction === "top" && entry.boundingClientRect.top < 0;
        const isComingFromBottom =
          direction === "bottom" && entry.boundingClientRect.top > 0;

        if (!direction || isComingFromTop || isComingFromBottom) {
          setIsInView(true);
          triggeredTimes.current += 1;

          // 當達到最大次數時停止觀察
          if (triggeredTimes.current >= times) {
            observer.unobserve(entry.target);
          }
        }
      } else {
        setIsInView(false);
      }
    }, rest);

    observer.observe(target);
    return () => observer.disconnect();
  }, [times, direction, rest]);

  return {
    ref,
    isInView,
  };
};
