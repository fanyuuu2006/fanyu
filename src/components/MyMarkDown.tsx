import { cn } from "@/utils/className";
import { OutsideLink } from "fanyucomponents";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MyMarkDownProps = React.HTMLAttributes<HTMLDivElement> & {
  children: string;
};

export const MyMarkDown = ({
  children,
  className,
  ...rest
}: MyMarkDownProps) => {
  return (
    <div
      className={cn(
        "text-base leading-7 text-(--muted) space-y-4",
        className,
      )}
      {...rest}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{

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
                    "rounded bg-(--primary)/15 px-1.5 py-0.5 font-mono text-[0.9em]",
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

          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-xl bg-black/10 p-4">
              {children}
            </pre>
          ),

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
    </div>
  );
};
