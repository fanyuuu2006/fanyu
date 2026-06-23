"use client";
import { education } from "@/libs/education";
import { ExperienceDiv } from "./ExperienceDiv";
import { MySection } from "./MySection";
import { OutsideLink } from "fanyucomponents";
import { MyImage } from "../MyImage";
import { ClockCircleOutlined } from "@ant-design/icons";

export const ExperienceSection = () => {
  return (
    <MySection id="experience" title="經歷">
      <div className="w-full flex flex-col gap-4 p-4">
        <ExperienceDiv title="學歷">
          <div className="divide-y divide-white/25">
            {education.map((item) => {
              return (
                <article
                  key={item.school}
                  className="py-7 first:pt-0 last:pb-0"
                >
                  <div key={item.school} className="flex items-start gap-4">
                    <div className="shrink-0 size-12 rounded-lg overflow-hidden bg-(--foreground)">
                      <MyImage
                        src={item.logo}
                        alt={item.school}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between">
                          <h4 className="text-base sm:text-lg md:text-xl font-semibold text-(--foreground)">
                            {item.link ? (
                              <OutsideLink
                                href={item.link}
                                className="hover:text-(--primary) transition-all duration-300"
                              >
                                {item.school}
                              </OutsideLink>
                            ) : (
                              item.school
                            )}
                          </h4>
                          <p className="text-sm text-(--muted) flex items-center gap-1">
                            <ClockCircleOutlined />
                            <span>
                              {item.duration.start} ~{" "}
                              {item.duration.end || "至今"}
                            </span>
                          </p>
                        </div>
                        <p className="text-(--muted) flex items-center gap-1">
                          {item.department && <span>{item.department}</span>}
                          <span>{item.degree}</span>
                        </p>
                        {item.description && <item.description />}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </ExperienceDiv>
        <ExperienceDiv title="工作"></ExperienceDiv>
      </div>
    </MySection>
  );
};
