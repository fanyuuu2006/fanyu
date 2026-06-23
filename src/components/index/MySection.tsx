type MySectionProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
};
export const MySection = ({ title, id, children, ...rest }: MySectionProps) => {
  return (
    <section id={id} {...rest}>
      <div className="container flex flex-col justify-center items-center gap-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold drop-shadow-[0_0_1rem_var(--primary)]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
};
