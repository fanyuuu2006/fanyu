import { OutsideLink, OutsideLinkProps, OverrideProps } from "fanyucomponents";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

export type CustomLinkProps = OverrideProps<LinkProps, OutsideLinkProps>;

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, ...rest }, ref) => {
    const Tag = href?.startsWith("/") ? Link : OutsideLink;

    return <Tag ref={ref} href={href || "/#"} {...rest} />;
  }
);
CustomLink.displayName = "CustomLink";
