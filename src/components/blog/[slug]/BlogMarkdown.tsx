import { CodePre } from "@/components/CodePre";
import { CustomLink } from "@/components/CustomLink";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { MyImage } from "@/components/MyImage";
import LinkOutlinedSvg from "@/components/svgs/LinkOutlinedSvg";
import { cn } from "@/utils/className";
import { headingToAnchor } from "@/utils/markdown";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingStyles: Record<HeadingTag, string> = {
  h1: "text-[2.25rem] leading-tight mt-0 mb-5", // 2.25rem, mb 加大到 1.25rem 讓與內文分隔更清楚
  h2: "text-[1.5rem] pb-2 mt-12 mb-4", // font-size 1.5rem, mt 3rem, mb 1rem（符合規格）
  h3: "text-[1.25rem] mt-8 mb-3", // 比 H2 小，不特別強調
  h4: "text-[1.1rem] mt-6 mb-2",
  h5: "text-[1rem] mt-5 mb-2", // 字級與內文同大，間距略收
  h6: "text-[0.9rem] text-(--muted) mt-4 mb-1.5", // 最小標題，間距最緊湊
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
      <div className="relative group" data-markdown-content>
        <a
          href={`#${id}`}
          className={cn(
            "absolute left-[-1.5em]",
            "top-1/2",
            "flex h-[1.5em] w-[1.5em] items-center justify-center",
            "rounded-sm opacity-0 transition-opacity duration-200",
            "group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100",
          )}
          style={{ transform: headingAnchorOffset[tag] }}
        >
          <LinkOutlinedSvg />
        </a>
        <Tag
          id={id}
          tabIndex={-1}
          className={cn(
            "font-bold leading-tight scroll-mt-24",
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

type BlogMarkdownProps = React.HTMLAttributes<HTMLElement> & {
  children: string;
};

export const BlogMarkdown = ({
  children,
  className,
  ...rest
}: BlogMarkdownProps) => {
  return (
    <MarkdownRenderer
      className={cn(
        "text-base leading-[1.8] wrap-break-word [&>*:first-child]:mt-0",
        className,
      )}
      components={{
        h1: createHeading("h1"),
        h2: createHeading("h2"),
        h3: createHeading("h3"),
        h4: createHeading("h4"),
        h5: createHeading("h5"),
        h6: createHeading("h6"),

        div: ({ children, ...rest }) => <div {...rest}>{children}</div>,
        picture: ({ children, ...rest }) => (
          <picture className="" {...rest}>
            {children}
          </picture>
        ),
        p: ({ children, ...rest }) => (
          <p dir="auto" className="mt-0 mb-5" {...rest}>
            {children}
          </p>
        ),

        img: ({ className, style, width, height, ...props }) => {
          return (
            <MyImage
              width={width}
              height={height}
              style={{
                ...style,
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined,
              }}
              className={cn(
                "block mx-auto max-w-full max-h-96 h-auto object-contain rounded-xl my-6",
                className,
              )}
              {...props}
            />
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-(--foreground)">
            {children}
          </strong>
        ),

        em: ({ children }) => <em className="italic">{children}</em>,

        ul: ({ children, className }) => (
          <ul
            className={cn(
              "mt-0 mb-5 list-disc pl-[1.75em] space-y-2 [&_ul]:list-[circle] [&_ul_ul]:list-[square]",
              className,
            )}
          >
            {children}
          </ul>
        ),

        ol: ({ children, className }) => (
          <ol
            className={cn(
              "mt-0 mb-5 list-decimal pl-[1.75em] space-y-2",
              className,
            )}
          >
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="mt-2 leading-[1.8] [&>p]:mt-4 [&>ul]:mt-0 [&>ul]:mb-0 [&>ol]:mt-0 [&>ol]:mb-0">
            {children}
          </li>
        ),

        a: ({ href, children, className, ...rest }) => (
          <CustomLink
            href={href}
            className={cn(
              "text-(--primary) underline underline-offset-2 decoration-(--primary)/40 hover:decoration-(--primary) transition-colors duration-200",
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
                "rounded-sm bg-(--foreground)/10 px-[0.4em] py-[0.2em] font-mono text-[85%] whitespace-break-spaces",
              )}
              {...props}
            >
              {children}
            </code>
          );
        },

        pre: CodePre,

        blockquote: ({ children }) => (
          <blockquote className="my-6 py-2 pl-4 pr-4 rounded-tr-md rounded-br-md border-l-4 border-(--primary)/50 bg-(--secondary-background) text-(--muted) *:first:mt-0 *:last:mb-0">
            {children}
          </blockquote>
        ),

        hr: () => (
          <hr className="my-12 h-px p-0 bg-(--border) border-0 overflow-hidden" />
        ),

        table: ({ children }) => (
          <div className="Blog-6 overflow-x-auto my-6">
            <table className="border-spacing-0 border-collapse block w-max max-w-full overflow-auto text-[0.95em] [font-variant:tabular-nums]">
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

        dl: ({ children }) => <dl className="mt-0 mb-5 p-0">{children}</dl>,
        dt: ({ children }) => (
          <dt className="mt-4 p-0 text-[1em] italic font-semibold">
            {children}
          </dt>
        ),
        dd: ({ children }) => <dd className="mb-5 ml-0 px-4">{children}</dd>,

        mark: ({ children }) => (
          <mark className="bg-(--primary)/20 text-(--foreground) rounded-sm px-[0.2em]">
            {children}
          </mark>
        ),

        kbd: ({ children }) => (
          <kbd className="inline-block py-[0.15em] px-[0.4em] font-mono text-[0.8em] leading-normal align-middle bg-(--secondary-background) border border-(--border) rounded-sm shadow-[inset_0_-1px_0_var(--border)]">
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
