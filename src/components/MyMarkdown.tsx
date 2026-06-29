import { cn } from "@/utils/className";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MyImage } from "./MyImage";
import { CodePre } from "./CodePre";
import { CustomLink } from "./CustomLink";

type MyMarkdownProps = React.HTMLAttributes<HTMLElement> & {
  children: string;
};

export const MyMarkdown = ({
  children,
  className,
  ...rest
}: MyMarkdownProps) => {
  return (
    <article
      className={cn(
        "text-base leading-normal wrap-break-word [&>*:first-child]:mt-0",
        className,
      )}
      {...rest}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
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
                  "inline max-w-full box-content border-none",
                  className,
                )}
                {...props}
              />
            );
          },

          h1: ({ children }) => (
            <h1 className="mt-6 mb-4 pb-[0.3em] text-[2em] font-semibold leading-tight border-b border-(--border)">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-6 mb-4 pb-[0.3em] text-[1.5em] font-semibold leading-tight border-b border-(--border)">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-4 text-[1.25em] font-semibold leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-4 text-[1em] font-semibold leading-tight">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="mt-6 mb-4 text-[0.875em] font-semibold leading-tight">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="mt-6 mb-4 text-[0.85em] font-semibold leading-tight text-(--muted)">
              {children}
            </h6>
          ),

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
            <li className="marker:text-(--primary) mt-[0.25em] [&>p]:mt-4 [&>ul]:mt-0 [&>ul]:mb-0 [&>ol]:mt-0 [&>ol]:mb-0">
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

          code: ({ node, className, children, ...props }) => {
            const isBlock = node?.position?.start.column === 1;
            if (isBlock) {
              return (
                <code
                  className={cn(
                    className,
                    "font-mono text-[85%] leading-[1.45]",
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={cn(
                  className,
                  "rounded-md bg-(--foreground)/10 px-[0.4em] py-[0.2em] font-mono text-[85%] whitespace-break-spaces",
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
      >
        {children}
      </ReactMarkdown>
    </article>
  );
};
