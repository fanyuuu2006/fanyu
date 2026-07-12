import { MyMarkdown } from "@/components/MyMarkdown";
import { cn } from "@/utils/className";

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
        <MyMarkdown>{content}</MyMarkdown>
      </div>
    </section>
  );
};
