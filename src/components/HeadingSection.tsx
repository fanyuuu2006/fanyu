type HeadingSectionProps = React.HTMLAttributes<HTMLElement> & {
  children?: never;
  title: string;
  description?: string;
};

export const HeadingSection = ({ title, description }: HeadingSectionProps) => {
  return (
    <section className="mt-24">
      <div className="container flex flex-col items-center justify-center py-12 gap-4">
        <h1 className="drop-shadow-[0_0_1rem_var(--primary)] text-4xl sm:text-5xl md:text-6xl font-bold text-center">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-(--muted)">
          {description}
        </p>
      </div>
    </section>
  );
};
