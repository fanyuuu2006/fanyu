import { cn } from "@/utils/className";
import { OutsideLink } from "fanyucomponents";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MyImage } from "./MyImage";

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
      className={cn("text-base leading-7 space-y-4", className)}
      {...rest}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ ...props }) => <MyImage {...props} />,
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-bold">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-bold">{children}</h6>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),

          em: ({ children }) => <em className="italic">{children}</em>,

          ul: ({ children }) => (
            <ul className="list-disc space-y-1 pl-6">{children}</ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 pl-6 ">{children}</ol>
          ),

          li: ({ children }) => (
            <li className="marker:text-(--primary)">{children}</li>
          ),

          a: ({ href, children, className, ...rest }) => (
            <OutsideLink
              href={href}
              className={cn(
                "font-medium text-(--primary) underline underline-offset-4 hover:opacity-80 transition",
                className,
              )}
              {...rest}
            >
              {children}
            </OutsideLink>
          ),

          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className ?? "");

            if (!isBlock) {
              return (
                <code
                  className={cn(
                    "rounded-md bg-(--primary)/20 px-1.5 py-0.5 font-mono text-[0.9em]",
                    className,
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          pre: ({ children, node }) => {
            console.log(node);
            return (
              <pre className="overflow-x-auto rounded-xl bg-black/10 p-4">
                {children}
              </pre>
            );
          },

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-(--primary) pl-4 italic text-(--foreground)/80">
              {children}
            </blockquote>
          ),

          hr: () => <hr className="my-6 border-(--border)" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
};
