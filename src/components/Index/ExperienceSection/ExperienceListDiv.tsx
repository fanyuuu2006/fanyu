import { useLanguage } from "@/context/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { Collapse } from "fanyucomponents";
import { useState } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { LanguageContent, LanguageOption } from "@/types/language";
import { DownOutlined } from "@ant-design/icons";
import { fadeInItem } from "@/lib/motion";

const viewLimit = 4;

type ExperienceContent = Record<"viewMore" | "collapse", string>;

const getExperienceContent = (language: LanguageOption): ExperienceContent =>
  ((
    {
      chinese: {
        viewMore: "查看更多",
        collapse: "收回",
      },
      english: {
        viewMore: "View More",
        collapse: "Collapse",
      },
    } as LanguageContent<ExperienceContent>
  )[language]);

export const ExperienceListDiv = ({ items }: { items: ExperienceItem[] }) => {
  const Language = useLanguage();
  const currentItems = items.slice(0, viewLimit);
  const nextItems = items.slice(viewLimit);
  const [showMore, setShowMore] = useState(false);
  const hasMore = nextItems.length > 0;
  const experienceContent = getExperienceContent(Language.Current);

  return (
    <>
      {currentItems.map((item) => (
        <ExperienceCard key={item.name.english} variants={fadeInItem} item={item} />
      ))}
      {hasMore && (
        <>
          <Collapse
            state={showMore}
            className="flex flex-col w-full gap-4 slide-collapse"
          >
            <ExperienceListDiv items={nextItems} />
          </Collapse>
          {!showMore && (
            <div className="w-full text-center">
              <button
                className="note hover:underline"
                onClick={() => {
                  setShowMore(true);
                }}
              >
                <DownOutlined /> {experienceContent.viewMore}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
