"use client";
import { education } from "@/libs/education";
import { ExperienceDiv } from "./ExperienceDiv";
import { MySection } from "./MySection";
import { work } from "@/libs/work";
import { club } from "@/libs/club";

export const ExperienceSection = () => {
  return (
    <MySection id="experience" title="經歷">
      <div className="w-full flex flex-col gap-8 p-4">
        <ExperienceDiv
          title="學歷"
          order="desc"
          items={education.map((item) => ({
            title: item.school,
            subtitle: [item.department, item.degree].filter(Boolean).join(" "),
            imgSrc: item.logo,
            period: `${item.duration.start} - ${item.duration.end || "至今"}`,
            link: item.link,
            description: item.description,
            points: item.focus || [],
          }))}
        />
        <ExperienceDiv
          title="工作"
          order="desc"
          items={work.map((item) => ({
            title: item.company,
            subtitle: item.role,
            imgSrc: item.logo,
            period: `${item.duration.start} - ${item.duration.end || "至今"}`,
            link: item.link,
            description: item.description,
            points: item.focus || [],
          }))}
        />
        <ExperienceDiv
          title="社團"
          order="asc"
          items={club.map((item) => ({
            title: item.organization,
            subtitle: item.role,
            imgSrc: item.logo,
            period: `${item.duration.start} - ${item.duration.end || "至今"}`,
            link: item.link,
            description: item.description,
            points: item.focus || [],
          }))}
        />
      </div>
    </MySection>
  );
};
