type ExperienceDivProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
};

export const ExperienceDiv = ({
  title,
  children,
  ...rest
}: ExperienceDivProps) => {
  return (
    <div {...rest}>
      <h3 className="flex items-center gap-2 text-2xl font-semibold text-(--foreground) mb-4">
        <span className="mt-2 size-2 shrink-0 rounded-full bg-(--primary) transition-transform" />
        {title}
      </h3>
      {children}
    </div>
  );
};
