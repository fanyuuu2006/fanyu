import { CodePre } from "@/components/CodePre";
import { CustomLink } from "@/components/CustomLink";
import { MyImage } from "@/components/MyImage";
import LinkOutlinedSvg from "@/components/svgs/LinkOutlinedSvg";
import { cn } from "@/utils/className";
import { headingToAnchor } from "@/utils/markdown";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingStyles: Record<HeadingTag, string> = {
  h1: "text-[2em] pb-[0.3em] border-b border-(--border)",
  h2: "text-[1.5em] pb-[0.3em] border-b border-(--border)",
  h3: "text-[1.25em]",
  h4: "text-[1em]",
  h5: "text-[0.875em]",
  h6: "text-[0.85em] text-(--muted)",
};

const headingAnchorOffset: Record<HeadingTag, string> = {
  h1: "translateY(calc(-50% - 0.3em))",
  h2: "translateY(calc(-50% - 0.3em))",
  h3: "translateY(-50%)",
  h4: "translateY(-50%)",
  h5: "translateY(-50%)",
  h6: "translateY(-50%)",
};

const createHeading = (tag: HeadingTag) => {
  const Tag = tag;
  const Heading = ({
    children,
    className,
    ...rest
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = headingToAnchor(children);

    return (
      <div className="relative group">
        <a
          href={`#${id}`}
          className={cn(
            "absolute left-[-1.5em]",
            "top-1/2",
            "flex h-[1.5em] w-[1.5em] items-center justify-center",
            "rounded-md opacity-0 transition-opacity",
            "group-hover:opacity-100",
          )}
          style={{ transform: headingAnchorOffset[tag] }}
        >
          <LinkOutlinedSvg />
        </a>
        <Tag
          id={id}
          tabIndex={-1}
          className={cn(
            "mt-6 mb-4 font-semibold leading-tight",
            headingStyles[tag],
            className,
          )}
          {...rest}
        >
          {children}
        </Tag>
      </div>
    );
  };

  return Heading;
};

type ReadMeMarkdownProps = React.HTMLAttributes<HTMLElement> & {
  children: string;
};

export const ReadMeMarkdown = ({
  children,
  className,
  ...rest
}: ReadMeMarkdownProps) => {
  return (
    <MarkdownRenderer
      className={cn(
        "text-base leading-normal wrap-break-word [&>*:first-child]:mt-0",
        className,
      )}
      components={{
        h1: createHeading("h1"),
        h2: createHeading("h2"),
        h3: createHeading("h3"),
        h4: createHeading("h4"),
        h5: createHeading("h5"),
        h6: createHeading("h6"),

        div: ({ children, ...rest }) => (
          <div {...rest} style={undefined}>
            {children}
          </div>
        ),
        picture: ({ children, ...rest }) => (
          <picture className="" {...rest}>
            {children}
          </picture>
        ),
        p: ({ children, ...rest }) => (
          <p dir="auto" className="mt-0 mb-4" {...rest}>
            {children}
          </p>
        ),

        img: ({ className, style, width, height, alt, ...props }) => {
          const imageAlt = alt?.trim() || "ReadMe image";

          if (!alt) {
            console.warn(
              "Image is missing alt attribute. Please provide descriptive alt text for accessibility.",
            );
          }

          return (
            <MyImage
              {...props}
              width={width ?? 800}
              height={height ?? 450}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              style={{
                ...style,
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined,
              }}
              className={cn(
                "inline max-w-full w-auto box-content border-none",
                className,
              )}
              {...props}
            />
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),

        em: ({ children }) => <em className="italic">{children}</em>,

        ul: ({ children, className }) => (
          <ul
            className={cn(
              "mt-0 mb-4 list-disc pl-[2em] [&_ul]:list-[circle] [&_ul_ul]:list-[square]",
              className,
            )}
          >
            {children}
          </ul>
        ),

        ol: ({ children, className }) => (
          <ol className={cn("mt-0 mb-4 list-decimal pl-[2em]", className)}>
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="mt-[0.25em] [&>p]:mt-4 [&>ul]:mt-0 [&>ul]:mb-0 [&>ol]:mt-0 [&>ol]:mb-0">
            {children}
          </li>
        ),

        a: ({ href, children, className, ...rest }) => (
          <CustomLink
            href={href}
            className={cn(
              "text-(--primary) underline transition-opacity",
              className,
            )}
            {...rest}
          >
            {children}
          </CustomLink>
        ),

        code: ({ className, children, ...props }) => {
          const isBlock = className?.startsWith("language-");
          if (isBlock) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
          return (
            <code
              className={cn(
                className,
                "rounded-md bg-(--foreground)/15 px-[0.4em] py-[0.2em] font-mono text-[85%] whitespace-break-spaces",
              )}
              {...props}
            >
              {children}
            </code>
          );
        },

        pre: CodePre,

        blockquote: ({ children }) => (
          <blockquote className="m-0 mb-4 pl-[1em] border-l-[0.25em] border-(--border) text-(--muted) *:first:mt-0 *:last:mb-0">
            {children}
          </blockquote>
        ),

        hr: () => (
          <hr className="my-6 h-[0.25em] p-0 bg-(--border) border-0 overflow-hidden" />
        ),

        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="border-spacing-0 border-collapse block w-max max-w-full overflow-auto [font-variant:tabular-nums]">
              {children}
            </table>
          </div>
        ),

        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,

        th: ({ children }) => (
          <th className="px-3.25 py-1.5 border border-(--border) font-semibold text-left bg-(--primary-background)">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="px-3.25 py-1.5 border border-(--border) align-center *:last:mb-0">
            {children}
          </td>
        ),

        tr: ({ children, ...props }) => (
          <tr
            className="bg-(--primary-background) border-t border-(--border) even:bg-(--secondary-background)"
            {...props}
          >
            {children}
          </tr>
        ),

        dl: ({ children }) => <dl className="mt-0 mb-4 p-0">{children}</dl>,
        dt: ({ children }) => (
          <dt className="mt-4 p-0 text-[1em] italic font-semibold">
            {children}
          </dt>
        ),
        dd: ({ children }) => <dd className="mb-4 ml-0 px-4">{children}</dd>,

        mark: ({ children }) => (
          <mark className="bg-(--primary)/20 text-(--foreground) rounded-sm px-[0.2em]">
            {children}
          </mark>
        ),

        kbd: ({ children }) => (
          <kbd className="inline-block py-[0.15em] px-[0.4em] font-mono text-[0.8em] leading-normal align-middle bg-(--secondary-background) border border-(--border) rounded-(--border-radius-sm) shadow-[inset_0_-1px_0_var(--border)]">
            {children}
          </kbd>
        ),

        sub: ({ children }) => (
          <sub className="text-[75%] leading-none relative align-baseline bottom-[-0.25em]">
            {children}
          </sub>
        ),
        sup: ({ children }) => (
          <sup className="text-[75%] leading-none relative align-baseline top-[-0.5em]">
            {children}
          </sup>
        ),
      }}
      {...rest}
    >
      {children}
    </MarkdownRenderer>
  );
};
