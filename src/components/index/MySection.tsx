import { cn } from "@/utils/className";

type MySectionProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
};
export const MySection = ({ title, className, id, children, ...rest }: MySectionProps) => {
  return (
    <section className={cn("py-12", className)} id={id} {...rest}>
      <div className="container flex flex-col justify-center items-center gap-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
};
