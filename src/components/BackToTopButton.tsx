"use client";
import { cn } from "@/utils/className";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";

type BackToTopButtonProps = React.HTMLAttributes<HTMLButtonElement>;
export const BackToTopButton = ({
  className,
  ...props
}: BackToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "btn rounded-full size-10 flex items-center justify-center",
        className,
      )}
      aria-label="Back to top"
      {...props}
    >
      <VerticalAlignTopOutlined aria-hidden />
    </button>
  );
};
