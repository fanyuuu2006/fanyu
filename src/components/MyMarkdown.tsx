import { cn } from "@/utils/className";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MyImage } from "./MyImage";
import { MarkdownPre } from "./MarkdownPre";
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
    <article className={cn("text-base leading-7", className)} {...rest}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ children, ...rest }) => (
            <p dir="auto" className="mb-4" {...rest}>
              {children}
            </p>
          ),

          img: ({ className, width, height, ...props }) => (
            <MyImage
              {...props}
              width={width}
              height={height}
              className={cn("inline-block max-w-full", className)}
            />
          ),

          // Headings：層次感 mt 遞減，mb 統一
          h1: ({ children }) => (
            <h1 className="mt-10 mb-4 border-b border-(--border) pb-2 text-3xl font-semibold">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 mb-3 border-b border-(--border) pb-1 text-2xl font-semibold">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 mb-2 text-lg font-semibold">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="mt-3 mb-1 text-base font-semibold">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="mt-3 mb-1 text-sm font-semibold opacity-70">
              {children}
            </h6>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),

          em: ({ children }) => <em className="italic">{children}</em>,

          // Lists：加 mb-4 與段落齊平，巢狀時縮排
          ul: ({ children, className }) => (
            <ul
              className={cn(
                "mb-4 list-disc space-y-1 pl-6",
                // 巢狀 ul 不加 mb
                className,
              )}
            >
              {children}
            </ul>
          ),

          ol: ({ children, className }) => (
            <ol className={cn("mb-4 list-decimal space-y-1 pl-6", className)}>
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="marker:text-(--primary) [&>ul]:mb-0 [&>ol]:mb-0 [&>ul]:mt-1 [&>ol]:mt-1">
              {children}
            </li>
          ),

          a: ({ href, children, className, ...rest }) => (
            <CustomLink
              href={href}
              className={cn(
                "font-medium text-(--primary) underline underline-offset-4 hover:opacity-80 transition",
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
                  className={cn(className, "text-sm leading-6 font-mono")}
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
                  "rounded-md bg-(--foreground)/10 px-1.5 py-0.5 font-mono text-[0.85em]",
                )}
                {...props}
              >
                {children}
              </code>
            );
          },

          pre: MarkdownPre,

          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-4 border-(--primary) pl-4 opacity-70">
              {children}
            </blockquote>
          ),

          hr: () => <hr className="my-6 border-4 border-(--border)" />,

          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="border-collapse border border-(--border) min-w-max">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-(--secondary-background)">{children}</thead>
          ),

          tbody: ({ children }) => <tbody>{children}</tbody>,

          th: ({ children }) => (
            <th className="border border-(--border) bg-(--secondary-background) px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-(--border) px-4 py-2 align-top">
              {children}
            </td>
          ),

          tr: ({ children }) => <tr>{children}</tr>,
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
};
