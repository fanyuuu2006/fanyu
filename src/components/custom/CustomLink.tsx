import { OutsideLink, OutsideLinkProps, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { forwardRef } from "react";

export type CustomLinkProps = OverrideProps<
  React.ComponentProps<typeof Link>,
  OutsideLinkProps
>;

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, ...rest }, ref) => {
    const Tag = href?.startsWith("/") ? Link : OutsideLink;

    return <Tag ref={ref} href={href || "/#"} {...rest} />;
  }
);
CustomLink.displayName = "CustomLink";
