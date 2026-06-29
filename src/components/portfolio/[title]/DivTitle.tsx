import { cn } from "@/utils/className";

type DivTitleProps = React.HTMLAttributes<HTMLDivElement>;
export const DivTitle = ({ className, children, ...rest }: DivTitleProps) => {
  return (
    <div className={cn("flex p-2", className)} {...rest}>
      <h3 className="text-xs font-semibold tracking-[0.2em] sm:text-sm">
        {children}
      </h3>
    </div>
  );
};
