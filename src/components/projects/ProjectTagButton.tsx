import { ProjectTag } from "@/types/portfolio";
import { OverrideProps } from "fanyucomponents";

export type ProjectTagButtonProps = OverrideProps<
  React.HTMLAttributes<HTMLButtonElement>,
  {
    tag: ProjectTag | null;
    currentTag: ProjectTag | null;
    setCurrentTag: React.Dispatch<React.SetStateAction<ProjectTag | null>>;
    categoriesShow: boolean;
    setCategoriesShow: React.Dispatch<React.SetStateAction<boolean>>;
  }
>;

export const ProjectTagButton = ({
  tag,
  currentTag,
  setCurrentTag,
  categoriesShow,
  setCategoriesShow,
  className = "",
  children,
  ...rest
}: ProjectTagButtonProps) => {
  const isActive = tag === currentTag;
  return (
    <button
      onClick={() => {
        if (!isActive) setCurrentTag(tag);
        if (categoriesShow) setCategoriesShow(false);
      }}
      className={`btn card-link ${
        isActive ? "brightness-200" : ""
      } px-2 rounded-sm whitespace-nowrap ${className} `}
      {...rest}
    >
      {children}
    </button>
  );
};
