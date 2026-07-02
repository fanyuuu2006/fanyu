"use client";
import ArrowLeftOutlinedSvg from "@/components/svgs/ArrowLeftOutlinedSvg";
import { cn } from "@/utils/className";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const BackDiv = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/portfolio");
    }
  }, [router]);
  return (
    <div className={cn("flex", className)} {...props}>
      <button
        className="btn flex items-center justify-center p-2.5 text-xl rounded-full"
        onClick={handleBackClick}
        aria-label="返回"
      >
        <ArrowLeftOutlinedSvg aria-hidden />
      </button>
    </div>
  );
};
