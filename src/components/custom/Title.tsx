import { cn } from "@/utils/className";
import { forwardRef } from "react";

export const Title = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({
    className,
    children,
    ...rest
  }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          "mb-8 text-5xl lg:text-6xl leading-tight font-bold bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent",
          className
        )}
        {...rest}
      >
        {children}
      </h1>
    );
  }
);
Title.displayName = "Title";