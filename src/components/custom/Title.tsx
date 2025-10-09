import { cn } from "@/utils/className";
import { forwardRef } from "react";

/**
 * 標題組件 - 用於顯示具有漸層效果的主標題
 * 
 * @component
 * @description 這是一個可重用的標題組件，提供預設的樣式和漸層效果。
 * 支援 forwardRef，可以直接傳遞 ref 到底層的 h1 元素。
 * 
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - 標準的 HTML heading 元素屬性
 * @param {string} [props.className] - 額外的 CSS class 名稱，會與預設樣式合併
 * @param {React.ReactNode} props.children - 標題的內容
 * @param {React.Ref<HTMLHeadingElement>} ref - 傳遞給 h1 元素的 ref
 * 
 * @returns {JSX.Element} 渲染的標題元素
 * 
 * @example
 * ```tsx
 * // 基本使用
 * <Title>我的標題</Title>
 * 
 * // 使用自定義 className
 * <Title className="extra-spacing">自定義標題</Title>
 * 
 * // 使用 ref
 * const titleRef = useRef<HTMLHeadingElement>(null);
 * <Title ref={titleRef}>可引用的標題</Title>
 * ```
 * 
 * @features
 * - 響應式字體大小 (text-5xl 在小螢幕, text-6xl 在大螢幕)
 * - 漸層文字效果 (從主色調到次色調)
 * - 粗體字重
 * - 預設下邊距 (mb-6)
 * - 支援 forwardRef
 * - 可擴展的 className
 */
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
          "mb-6 text-5xl lg:text-6xl leading-tight font-bold bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent",
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