import type { OutsideLinkProps, OverrideProps } from "fanyucomponents";
import { OutsideLink } from "fanyucomponents";
import Link from "next/link";
import { forwardRef } from "react";

/**
 * CustomLink 組件的 props 型別定義
 * 結合了 Next.js Link 組件的 props 和 OutsideLink 的 props
 */
export type CustomLinkProps = OverrideProps<
  React.ComponentProps<typeof Link>,
  OutsideLinkProps
>;

/**
 * 判斷是否為內部連結
 * @param href - 連結 URL
 * @returns 如果是內部連結返回 true，否則返回 false
 */
const isInternalLink = (href: string | undefined): boolean => {
  return Boolean(href?.startsWith("/"));
};

/**
 * CustomLink 組件
 * 
 * 智能連結組件，能夠自動判斷連結類型：
 * - 如果 href 以 "/" 開頭，使用 Next.js 的 Link 組件進行內部路由
 * - 否則使用 OutsideLink 組件處理外部連結
 * 
 * @param props - 組件屬性
 * @param props.href - 連結的目標 URL
 * @returns 根據連結類型返回相應的連結組件
 */
export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, ...rest }, ref) => {
    const LinkComponent = isInternalLink(href) ? Link : OutsideLink;
    const safeHref = href || "/";

    return <LinkComponent ref={ref} href={safeHref} {...rest} />;
  }
);

CustomLink.displayName = "CustomLink";
