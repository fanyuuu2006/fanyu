import { skillCategories } from "@/libs/skills";
import { MySection } from "./MySection";
import { SkillBadge } from "./SkillBadge";

export const SkillsSection = () => {
  return (
    <MySection id="skills" title="技能專長">
      <ul className="text-(--foreground) w-full flex flex-col justify-center items-center gap-6">
        {skillCategories.map((category) => (
          <li key={category.label}>
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-(--foreground) mb-4">
              <span className="size-2 shrink-0 rounded-full bg-(--primary)" />
              {category.label}
              <div className="h-px w-12 rounded-full bg-linear-to-r from-(--secondary) to-transparent" />
            </h3>
            <div className="text-2xl grid grid-cols-6 sm:grid-cols-10 md:grid-cols-13 lg:grid-cols-16 gap-3 p-4">
              {category.list.map((item) => (
                <SkillBadge key={item.title} item={item} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </MySection>
  );
};
