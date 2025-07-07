import { ProjectTag } from "@/types/portfolio";
import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";

export type ProjectTagCheckboxProps = OverrideProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  {
    tag: ProjectTag | null;
    currentTags: Set<ProjectTag> | null;
    setCurrentTags: React.Dispatch<
      React.SetStateAction<Set<ProjectTag> | null>
    >;
  }
>;

export const ProjectTagCheckbox = ({
  tag,
  currentTags,
  setCurrentTags,
  className = "",
  children,
  ...rest
}: ProjectTagCheckboxProps) => {
  const isActive = tag ? currentTags?.has(tag) : currentTags === null;
  const baseClass = "px-4 py-1 rounded-full whitespace-nowrap";
  const variantClass = isActive ? "btn-secondary" : "btn-tertiary";
  return (
    <label className={cn(baseClass, variantClass, className)} {...rest}>
      <input
        type="checkbox"
        className="hidden"
        checked={!!isActive}
        onChange={() => {
          if (tag) {
            setCurrentTags((prevTags) => {
              const newTags = new Set(prevTags ?? []);
              if (newTags.has(tag)) {
                newTags.delete(tag);
              } else {
                newTags.add(tag);
              }
              return newTags.size > 0 ? newTags : null;
            });
          } else {
            setCurrentTags(null);
          }
        }}
      />
      {children}
    </label>
  );
};
