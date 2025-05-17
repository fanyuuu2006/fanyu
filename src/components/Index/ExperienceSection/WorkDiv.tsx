import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { profile } from "@/lib/profile";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse } from "fanyucomponents";
import { ExperienceCard } from "./ExperienceCard";

type WorkContent = Record<"work" | "viewAll" | "collapse", string>;

const getWorkContent = (language: LanguageOption): WorkContent =>
  ((
    {
      chinese: {
        work: "工作",
        viewAll: "查看全部",
        collapse: "收回",
      },
      english: {
        work: "Work",
        viewAll: "View all",
        collapse: "Collapse",
      },
    } as LanguageContent<WorkContent>
  )[language]);

export type WorkDivProps = React.HTMLAttributes<HTMLDivElement>;

export const WorkDiv = ({ className = "", ...rest }: WorkDivProps) => {
  const Language = useLanguage();
  const workContent = getWorkContent(Language.Current);
  const nowWorkItem = profile.experience.work[0];
  const pastWorkItems = profile.experience.work.slice(1);

  const [allShow, setAllShow] = useState<boolean>(false);
  return (
    <div
      className={`flex flex-col w-full items-start gap-4 ${className} `}
      {...rest}
    >
      <div className="content font-bold ">{workContent.work}</div>
      <div className={`flex flex-col w-full ${allShow ? "gap-4" : ""}`}>
        <ExperienceCard item={nowWorkItem} />
        <Collapse
          state={allShow}
          className="flex flex-col w-full gap-4 slide-collapse"
        >
          {pastWorkItems.map((item) => (
            <ExperienceCard key={item.name.english} item={item} />
          ))}
        </Collapse>
      </div>
      <div className="w-full text-center">
        <button
          className="note hover:underline"
          onClick={() => {
            setAllShow((prev) => !prev);
          }}
        >
          {allShow ? (
            <>
              <UpOutlined /> {workContent.collapse}
            </>
          ) : (
            <>
              <DownOutlined /> {workContent.viewAll}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
