type IndexSectionProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
};
export const IndexSection = ({
  title,
  id,
  children,
  ...rest
}: IndexSectionProps) => {
  return (
    <section id={id} {...rest}>
      <div className="container flex flex-col justify-center items-center gap-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold drop-shadow-[0_0_1rem_var(--primary)]">
            {title}
          </h2>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};
