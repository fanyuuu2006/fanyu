import { useInView, UseInViewOptions } from "framer-motion";
import { useEffect, useRef } from "react";

export const useInViewUnderlineSpread = <T extends HTMLElement>(
  { root, margin, amount, once, initial }: UseInViewOptions = {
    root: undefined, // 要觀察哪個容器，null = 整個視窗
    margin: "0px", // 提前多少觸發 in-view（可加 margin）
    amount: 1, // 幾成進入畫面才算 in-view
    once: true, // 只觸發一次
    initial: false, // 預設不要啟用
  }
): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  const isInView = useInView(ref, {
    root,
    margin,
    amount,
    once,
    initial,
  });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    if (isInView) {
      el.classList.remove("underline-spread");
      void el.offsetWidth; // 強制重繪（flush layout）
      el.classList.add("underline-spread");
    } else {
      el.classList.remove("underline-spread");
    }
    return () => {
      el.classList.remove("underline-spread"); // 清除 class
    };
  }, [isInView]);

  return ref;
};
