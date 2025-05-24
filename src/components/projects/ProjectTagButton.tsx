import { ProjectTag } from "@/types/portfolio";
import { OverrideProps } from "fanyucomponents";

export type ProjectTagButtonProps = OverrideProps<
  React.HTMLAttributes<HTMLButtonElement>,
  {
    tag: ProjectTag | null;
    currentTags: Set<ProjectTag> | null;
    setCurrentTags: React.Dispatch<
      React.SetStateAction<Set<ProjectTag> | null>
    >;
  }
>;

export const ProjectTagButton = ({
  tag,
  currentTags,
  setCurrentTags,
  className = "",
  children,
  ...rest
}: ProjectTagButtonProps) => {
  const isActive = tag ? currentTags?.has(tag) : currentTags === null;
  return (
    <button
      onClick={() => {
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
      className={`btn ${
        isActive ? "brightness-[var(--brightness-light)]" : ""
      } px-2 rounded-sm whitespace-nowrap ${className} `}
      {...rest}
    >
      {children}
    </button>
  );
};
