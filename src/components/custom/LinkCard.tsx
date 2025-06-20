import { OutsideLink, OutsideLinkProps, OverrideProps } from "fanyucomponents";
import Link, { LinkProps } from "next/link";

export type LinkCardProps = OverrideProps<
  LinkProps,
  OutsideLinkProps & {
    borderWeight?: string;
    backgrounds?: React.CSSProperties["color"][];
  }
>;

export const LinkCard = ({
  href,
  style,
  borderWeight,
  backgrounds,
  className,
  ...rest
}: LinkCardProps) => {
  const Tag = href?.startsWith("/") ? Link : OutsideLink;

  return (
    <div
      className="group rounded-2xl"
      style={{
        padding: borderWeight || "3px",
        background: backgrounds?.length
          ? `linear-gradient(45deg, ${backgrounds.join(",")})`
          : "var(--text-color-primary)",
      }}
    >
      <Tag
        className={`${className} flex items-center justify-center gap-2  no-underline bg-[var(--background-color-dark)] transition-all duration-300 rounded-[inherit] group-hover:bg-transparent`}
        href={href || "/#"}
        style={{
          ...style,
        }}
        {...rest}
      />
    </div>
  );
};
