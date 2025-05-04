import { PortfolioTag } from "@/types/portfolio";

export interface PortfolioTagButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  tag: PortfolioTag | null;
  currentTag: PortfolioTag | null;
  setCurrentTag?: React.Dispatch<React.SetStateAction<PortfolioTag | null>>;
  setCategoriesShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PortfolioTagButton = ({
  tag,
  currentTag,
  setCurrentTag,
  setCategoriesShow,
  className,
  children,
  ...rest
}: PortfolioTagButtonProps) => {
  return (
    <button
      onClick={() => {
        setCurrentTag?.(tag);
        setCategoriesShow?.(false);
      }}
      className={`${className ?? ""} btn card-link ${
        tag === currentTag ? "brightness-200" : ""
      } px-2 rounded-sm whitespace-nowrap`}
      {...rest}
    >
      {children}
    </button>
  );
};
