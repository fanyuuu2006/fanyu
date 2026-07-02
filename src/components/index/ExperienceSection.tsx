import { education } from "@/libs/education";
import { ExperienceDiv } from "./ExperienceDiv";
import { MySection } from "./MySection";
import { work } from "@/libs/work";
import { club } from "@/libs/club";
import { competition } from "@/libs/competition";

export const ExperienceSection = () => {
  return (
    <MySection id="experience" title="經歷">
      <div className="w-full flex flex-col gap-8 p-4">
        <ExperienceDiv
          title="學歷"
          order="desc"
          maxVisible={1}
          items={education}
        />
        <ExperienceDiv title="工作" order="desc" items={work} />
        <ExperienceDiv title="社團" order="asc" items={club} />
        <ExperienceDiv
          title="競賽"
          order="desc"
          maxVisible={3}
          items={competition}
        />
      </div>
    </MySection>
  );
};
