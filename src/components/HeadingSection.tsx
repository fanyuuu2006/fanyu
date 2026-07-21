type HeadingSectionProps = React.HTMLAttributes<HTMLElement> & {
  children?: never;
  title: string;
  description?: string;
};

export const HeadingSection = ({ title, description }: HeadingSectionProps) => {
  return (
    <section className="mt-20">
      <div className="container flex flex-col items-center justify-center py-8 gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-(--muted)">
          {description}
        </p>
      </div>
    </section>
  );
};
