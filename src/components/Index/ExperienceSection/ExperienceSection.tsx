"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { profile } from "@/lib/profile";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { ExperienceTab } from "@/types/experience";
import { experienceTabIcons, experienceTabs } from "@/lib/experience";
import { ExperienceCard } from "./ExperienceCard";
import { Collapse } from "fanyucomponents";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

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
    (a, b) =>
      new Date(b.duration.start).getTime() -
      new Date(a.duration.start).getTime()
  );

  const defaultItems = sortedItems.slice(0, viewLimit);
  const moreItems = sortedItems.slice(viewLimit);
  const hasMore = moreItems.length > 0;

  return (
    <section id="experience">
      <motion.div
        variants={fadeInItem}
        initial="hiddenLeft"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container flex flex-col items-center overflow-x-hidden"
      >
        <div className="title font-bold">{experienceContent.experience}</div>
        <div className="flex flex-col w-full gap-4">
          <div
            role="tablist"
            className="w-full bg-[var(--background-color-dark)] rounded-lg flex justify-between p-1"
          >
            {experienceTabs.map((key) => (
              <button
                role="tab"
                aria-selected={Tab === key}
                aria-controls={key}
                aria-label={experienceContent[key]}
                key={key}
                className={`note font-bold rounded-lg flex flex-wrap flex-1 items-center justify-center p-2 gap-2 transition-[background-color] duration-200 ${
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
                    <ExperienceCard
                      key={item.name.english}
                      variants={fadeInItem}
                      item={item}
                    />
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
                        {...(showMore ? { style: { overflow: "visible" } } : {})}
                      >
                        {moreItems.map((item) => (
                          <ExperienceCard
                            key={item.name.english}
                            variants={fadeInItem}
                            item={item}
                          />
                        ))}
                      </Collapse>
                      <div className="w-full text-center">
                        <button
                          className="note hover:underline"
                          onClick={() => {
                            setShowMore((prev) => !prev);
                          }}
                        >
                          {showMore ? (
                            <>
                              <UpOutlined /> {experienceContent.collapse}
                            </>
                          ) : (
                            <>
                              <DownOutlined /> {experienceContent.viewMore}
                            </>
                          )}
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
                  <span className="content font-bold">
                    {experienceContent[Tab]}
                  </span>
                  <span className="note">{experienceContent.noExperience}</span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
