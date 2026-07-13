import { cn } from "@/utils/className";
import { BlogMarkdown } from "./BlogMarkdown";

type ContentSectionProps = React.HTMLAttributes<HTMLElement> & {
  content: string;
};
export const ContentSection = ({
  content,
  className,
  ...rest
}: ContentSectionProps) => {
  return (
    <section {...rest} className={cn("py-8", className)}>
      <div className="container">
        <BlogMarkdown className="max-w-180 mx-auto">{content}</BlogMarkdown>
      </div>
    </section>
  );
};
