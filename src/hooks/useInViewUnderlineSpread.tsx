import { OverrideProps } from "fanyucomponents";
import { useInView, UseInViewOptions } from "framer-motion";
import { useEffect, useRef } from "react";

export const useInViewUnderlineSpread = <
  T1 extends HTMLElement = HTMLElement,
  T2 extends HTMLElement = HTMLElement
>(
  {
    target,
    root,
    margin,
    amount,
    once,
    initial,
  }: OverrideProps<
    UseInViewOptions,
    {
      target?: React.RefObject<T2 | null>;
    }
  > = {
    target: undefined,
    root: undefined,
    margin: "0px",
    amount: 1,
    once: true,
    initial: false,
  }
): React.RefObject<T1 | null> => {
  const ref = useRef<T1>(null);

  const isInView = useInView(ref, {
    root,
    margin,
    amount,
    once,
    initial,
  });

  useEffect(() => {
    const el = target?.current || ref.current;
    if (!el) return;

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
  }, [isInView, target]);

  return ref;
};
