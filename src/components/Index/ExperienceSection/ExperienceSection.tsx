"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { profile } from "@/libs/profile";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { ExperienceTab } from "@/types/experience";
import { experienceTabIcons, experienceTabs } from "@/libs/education";
import { ExperienceCard } from "./ExperienceCard";
import { Collapse } from "fanyucomponents";
import { Title } from "@/components/custom/Title";
import { parseDate } from "@/utils/experience";

type ExperienceContent = Record<
  "experience" | ExperienceTab | "noExperience" | "viewMore" | "collapse",
  string
>;
const getExperienceContent = (language: LanguageOption): ExperienceContent =>
  ((
    {
      chinese: {
        experience: "經歷",
        education: "學歷",
        club: "社團",
        work: "工作",
        competition: "競賽",
        noExperience: "尚無經歷資料。",
        viewMore: "查看更多",
        collapse: "收起",
      },
      english: {
        experience: "Experience",
        education: "Education",
        club: "Club",
        work: "Work",
        competition: "Competition",
        noExperience: "No experience data.",
        viewMore: "View More",
        collapse: "Collapse",
      },
    } as LanguageContent<ExperienceContent>
  )[language]);

const viewLimit = 4;

export const ExperienceSection = () => {
  const Language = useLanguage();
  const experienceContent = getExperienceContent(Language.Current);
  const [Tab, setTab] = useState<ExperienceTab>("education");
  const [showMore, setShowMore] = useState(false);

  const sortedItems = profile.experience[Tab].sort(
    (a, b) => parseDate(b.duration).getTime() - parseDate(a.duration).getTime()
  );

  const defaultItems = sortedItems.slice(0, viewLimit);
  const moreItems = sortedItems.slice(viewLimit);
  const hasMore = moreItems.length > 0;

  return (
    <section id="experience">
      <div className="container flex flex-col gap-8 items-center overflow-x-hidden">
        <Title>{experienceContent.experience}</Title>
        <div className="flex flex-col w-full gap-4">
          {/** 分頁選單 */}
          <div
            role="tablist"
            className="w-full bg-black rounded-2xl grid grid-cols-4 p-1"
          >
            {experienceTabs.map((key) => (
              <button
                role="tab"
                aria-selected={Tab === key}
                aria-controls={key}
                aria-label={experienceContent[key]}
                key={key}
                className={`text-base md:text-xl font-semibold rounded-[inherit] flex flex-col md:flex-row w-full items-center justify-center p-2 gap-1 ${
                  Tab === key ? "btn" : ""
                }`}
                onClick={() => {
                  if (Tab === key) return;
                  setTab(key);
                }}
              >
                {experienceTabIcons[key]}
                {experienceContent[key]}
              </button>
            ))}
          </div>

          {/** 內容區域 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={Tab}
              className="w-full flex flex-col items-center gap-4"
              variants={staggerContainer}
              initial="hiddenLeft"
              animate="show"
              exit="hiddenRight"
            >
              {sortedItems.length > 0 ? (
                <>
                  {defaultItems.map((item) => (
                    <motion.div
                      variants={fadeInItem}
                      key={item.name.english}
                      className="w-full"
                    >
                      <ExperienceCard item={item} className="w-full" />
                    </motion.div>
                  ))}
                  {hasMore && (
                    <div
                      className={`w-full flex flex-col ${
                        showMore ? "gap-4" : ""
                      }`}
                    >
                      <Collapse
                        as={"div"}
                        state={showMore}
                        className="flex flex-col w-full gap-4 slide-collapse"
                        {...(showMore
                          ? { style: { overflow: "visible" } }
                          : {})}
                      >
                        {moreItems.map((item) => (
                          <motion.div
                            variants={fadeInItem}
                            key={item.name.english}
                            className="w-full"
                          >
                            <ExperienceCard item={item} className="w-full" />
                          </motion.div>
                        ))}
                      </Collapse>
                      <div className="w-full">
                        <button
                          className="btn-secondary mx-auto text-sm md:text-base xl:text-lg font-semibold rounded-full flex items-center px-4 py-2"
                          onClick={() => {
                            setShowMore((prev) => !prev);
                          }}
                        >
                          {showMore
                            ? experienceContent.collapse
                            : experienceContent.viewMore}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  variants={fadeInItem}
                  className="card w-full flex flex-col items-center p-4"
                >
                  <span className="text-3xl font-bold">
                    {experienceContent[Tab]}
                  </span>
                  <span className="text-2xl">
                    {experienceContent.noExperience}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
