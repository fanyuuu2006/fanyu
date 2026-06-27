import { MyMarkdown } from "@/components/MyMarkdown";

type ReadMeSectionProps = {
  children: string;
};

export const ReadMeSection = ({ children }: ReadMeSectionProps) => {
  return (
    <section>
      <div className="container">
        <MyMarkdown className="text-(--muted)">{children}</MyMarkdown>
      </div>
    </section>
  );
};
