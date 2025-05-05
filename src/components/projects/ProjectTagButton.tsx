import { ProjectTag } from "@/types/portfolio";

export interface ProjectTagButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  tag: ProjectTag | null;
  currentTag: ProjectTag | null;
  setCurrentTag?: React.Dispatch<React.SetStateAction<ProjectTag | null>>;
  setCategoriesShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectTagButton = ({
  tag,
  currentTag,
  setCurrentTag,
  setCategoriesShow,
  className,
  children,
  ...rest
}: ProjectTagButtonProps) => {
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
