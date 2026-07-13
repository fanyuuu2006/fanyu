import { cn } from "@/utils/className";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = React.HTMLAttributes<HTMLElement> & {
  children: string;
  components?: Components;
};

export const MarkdownRenderer = ({
  children,
  className,
  components,
  ...rest
}: MarkdownRendererProps) => {
  return (
    <article className={cn(className)} {...rest}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
};
