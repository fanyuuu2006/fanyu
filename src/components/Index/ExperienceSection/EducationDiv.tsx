import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { EducationCard } from "./EducationCard";
import { profile } from "@/lib/profile";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse } from "fanyucomponents";

type EducationContent = Record<"eduction" | "viewAll" | "collapse", string>;

const getEduationContent = (language: LanguageOption): EducationContent =>
  ((
    {
      chinese: {
        eduction: "學歷",
        viewAll: "查看全部",
        collapse: "收回",
      },
      english: {
        eduction: "Eduction",
        viewAll: "View all",
        collapse: "Collapse",
      },
    } as LanguageContent<EducationContent>
  )[language]);

export type EducationDivProps = React.HTMLAttributes<HTMLDivElement>;

export const EducationDiv = ({ className, ...rest }: EducationDivProps) => {
  const Language = useLanguage();
  const educationContent = getEduationContent(Language.Current);
  const nowEducationItem = profile.experience.education[0];
  const pastEducationItems = profile.experience.education.slice(1);

  const [allShow, setAllShow] = useState<boolean>(false);
  return (
    <div
      className={`${className ?? ""} flex flex-col w-full items-start gap-4`}
      {...rest}
    >
      <div className="content font-bold ">{educationContent.eduction}</div>
      <div className={`flex flex-col w-full ${allShow && "gap-4"}`}>
        <EducationCard item={nowEducationItem} />
        <Collapse state={allShow} className="flex flex-col w-full gap-4 slide-collapse">
          {pastEducationItems.map((item) => (
            <EducationCard key={item.name.english} item={item} />
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
              <UpOutlined /> {educationContent.collapse}
            </>
          ) : (
            <>
              <DownOutlined /> {educationContent.viewAll}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
