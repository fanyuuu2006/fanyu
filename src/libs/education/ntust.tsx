import { Semester, Course, ExperienceItem } from "@/types/experience";
import { cn } from "@/utils/className";
import { calculateGPA } from "@/utils/experience";
import {
  LinkOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  TrophyOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useModal } from "fanyucomponents";
import React from "react";

const NTUST: ExperienceItem = {
  name: {
    chinese: "國立臺灣科技大學",
    english: "National Taiwan University of Science and Technology",
  },
  department: {
    chinese: "資訊管理系",
    english: "Department of Information Management",
  },
  role: {
    chinese: "就讀中",
    english: "Currently Enrolled",
  },
  duration: { start: "2024-09", end: null },
  links: [
    {
      chinese: "國立臺灣科技大學官網",
      english:
        "National Taiwan University of Science and Technology Official Website",
      icon: <LinkOutlined />,
      href: "https://www.ntust.edu.tw/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rzro8g26H8Pb1f1EA",
    },
  ],
  imageSrc:
    "https://upload.wikimedia.org/wikipedia/zh/b/b1/Taiwan_Tech_Logo.svg",
  description: ({ language }) => {
    const allCourses = Object.values(grades).flatMap((data) => data.courses);
    const overallGPA = calculateGPA(allCourses);

    const getGradeColor = (grade: string | null) => {
      if (!grade) return "text-(--text-color-muted)";
      if (["A+", "A", "A-"].includes(grade)) return "text-green-400";
      if (["B+", "B", "B-"].includes(grade)) return "text-cyan-400";
      if (["C+", "C", "D+", "E", "X"].includes(grade)) return "text-red-400";
      if (grade === "通過") return "text-yellow-400";
      return "text-(--text-color-primary)";
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {[
            {
              icon: IdcardOutlined,
              label: { chinese: "學生證號", english: "Student ID" },
              content: {
                chinese: "B11309044",
                english: "B11309044",
              },
            },
          ].map((chunk, index) => (
            <div
              key={index}
              className="card flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-transparent!"
            >
              <chunk.icon className="text-lg sm:text-xl shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-(--text-color-muted)">
                  {chunk.label[language]}
                </span>
                <span className="text-sm sm:text-base font-semibold">
                  {chunk.content[language]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="card p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-xs sm:text-sm text-(--text-color-muted)">
              {
                {
                  chinese: "總學分",
                  english: "Total Credits",
                }[language]
              }
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-(--text-color-primary)">
              {overallGPA.totalCredits}
            </span>
          </div>
          <div className="card p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-xs sm:text-sm text-(--text-color-muted)">
              {
                {
                  chinese: "累計 GPA",
                  english: "Overall GPA",
                }[language]
              }
            </span>
            <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-(--text-color-primary) to-(--text-color-secondary)">
              {Math.round(overallGPA.gpa * 100) / 100}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(grades).map(([semester, data]) => {
            const { gpa, totalCredits } = calculateGPA(data.courses);
            const modal = useModal();

            return (
              <React.Fragment key={semester}>
                <div
                  onClick={modal.Open}
                  className="card group relative p-5 cursor-pointer"
                >
                  <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                    <BookOutlined className="text-8xl" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs text-(--text-color-muted) uppercase tracking-wider">
                          {language === "chinese" ? "學期" : "Semester"}
                        </span>
                        <h3 className="text-xl font-bold text-(--text-color-primary)">
                          {semester}
                        </h3>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-(--background-color-secondary) text-xs font-medium border border-(--border-color)">
                        {data.courses.length}{" "}
                        {language === "chinese" ? "門課" : "Courses"}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-(--text-color-primary) to-(--text-color-secondary)">
                        {Math.round(gpa * 100) / 100}
                      </span>
                      <span className="text-sm text-(--text-color-muted) font-medium">
                        GPA
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-(--border-color)">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-(--text-color-muted)">
                          {language === "chinese" ? "學分" : "Credits"}
                        </span>
                        <span className="font-semibold">{totalCredits}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-(--text-color-muted) flex items-center gap-1">
                          <TrophyOutlined />{" "}
                          {language === "chinese" ? "班排" : "Class Rank"}
                        </span>
                        <span className="font-semibold">
                          {data.classRank || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <modal.Container>
                  <div className="animate-pop card w-full max-w-2xl bg-(--background-color-primary)! overflow-hidden flex flex-col max-h-[80vh]">
                    <div className="p-5 border-b border-(--border-color) bg-(--background-color-secondary)/50 backdrop-blur-sm flex justify-between items-center sticky top-0 z-10">
                      <div>
                        <h2 className="text-xl font-bold">
                          {semester}{" "}
                          {language === "chinese" ? "成績單" : "Transcript"}
                        </h2>
                        <div className="flex gap-3 mt-1 text-sm text-(--text-color-muted)">
                          <span>GPA: {Math.round(gpa * 100) / 100}</span>
                          <span>•</span>
                          <span>
                            {totalCredits}{" "}
                            {language === "chinese" ? "學分" : "Credits"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-y-auto p-4">
                      <div className="grid grid-cols-1 gap-3">
                        {data.courses.map((course, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-xl border border-(--border-color) hover:bg-(--background-color-secondary) transition-colors group"
                          >
                            <div className="flex flex-col gap-1">
                              <h4 className="font-semibold text-base group-hover:text-(--text-color-primary) transition-colors">
                                {course.courseName[language]}
                              </h4>
                              <span className="text-xs text-(--text-color-muted)">
                                {course.credits}{" "}
                                {language === "chinese" ? "學分" : "Credits"}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "text-xl font-bold tabular-nums",
                                getGradeColor(course.grade)
                              )}
                            >
                              {course.grade || "-"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </modal.Container>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
};

export const grades: Record<
  Semester,
  { classRank?: number; departmentRanK?: number; courses: Course[] }
> = {
  "113-1": {
    classRank: 27,
    departmentRanK: 27,
    courses: [
      {
        courseName: {
          chinese: "英文字彙與閱讀(上)",
          english: "English Vocabulary and Reading (I)",
        },
        grade: "A-",
        credits: 2,
      },
      {
        courseName: {
          chinese: "英語口語訓練(上)",
          english: "Oral-arual Drills in English (I)",
        },
        grade: "B+",
        credits: 2,
      },
      {
        courseName: {
          chinese: "新生中文說寫專題",
          english: "Freshman Seminar in Chinese Expression",
        },
        grade: "B-",
        credits: 3,
      },
      {
        courseName: {
          chinese: "醫學與生活",
          english: "Medical Science and Life",
        },
        grade: "A",
        credits: 2,
      },
      {
        courseName: {
          chinese: "管理與企業倫理",
          english: "Management and Business Ethics",
        },
        grade: "A-",
        credits: 3,
      },
      {
        courseName: {
          chinese: "計算機概論",
          english: "Introduction to Computer",
        },
        grade: "A-",
        credits: 3,
      },
      {
        courseName: {
          chinese: "雲端應用安全導論",
          english: "Introduction to Cloud Application Security",
        },
        grade: "B+",
        credits: 3,
      },
      {
        courseName: {
          chinese: "微積分(上)",
          english: "Calculus (I)",
        },
        grade: "B",
        credits: 3,
      },
      {
        courseName: {
          chinese: "應用程式語言",
          english: "Applied Programming Language",
        },
        grade: "A",
        credits: 3,
      },
      {
        courseName: {
          chinese: "體育(羽球)(上)",
          english: "Physical Education (Badminton) (I)",
        },
        grade: "A",
        credits: 0,
      },
    ],
  },
  "113-2": {
    classRank: 27,
    departmentRanK: 27,
    courses: [
      {
        courseName: {
          chinese: "英文字彙與閱讀(下)",
          english: "English Vocabulary and Reading (II)",
        },
        grade: "A-",
        credits: 2,
      },
      {
        courseName: {
          chinese: "英語口語訓練(下)",
          english: "Oral-arual Drills in English (II)",
        },
        grade: "B+",
        credits: 2,
      },
      {
        courseName: {
          chinese: "表達與經典閱讀",
          english: "Expression and Classic",
        },
        grade: "A",
        credits: 3,
      },
      {
        courseName: {
          chinese: "人類文明起源史",
          english: "The Origins of Human Civilizations",
        },
        grade: "B",
        credits: 2,
      },
      {
        courseName: {
          chinese: "資管導論",
          english: "Introduction to Information Management",
        },
        grade: "A-",
        credits: 3,
      },
      {
        courseName: {
          chinese: "程式設計",
          english: "Software Programming",
        },
        grade: "A+",
        credits: 3,
      },
      {
        courseName: {
          chinese: "微積分(下)",
          english: "Calculus (II)",
        },
        grade: "B",
        credits: 3,
      },
      {
        courseName: {
          chinese: "物件導向程式語言",
          english: "Object Oriented Programming Language",
        },
        grade: "A+",
        credits: 3,
      },
      {
        courseName: {
          chinese: "體育(羽球)(下)",
          english: "Physical Education (Badminton) (II)",
        },
        grade: "A",
        credits: 0,
      },
      {
        courseName: {
          chinese: "社會實踐",
          english: "Social Practice",
        },
        grade: "通過",
        credits: 1,
      },
      {
        courseName: {
          chinese: "藝術治療初探",
          english: "Preliminary Study of Art Therapy",
        },
        grade: "B-",
        credits: 2,
      },
    ],
  },
  "114-2": {
    courses: [
      {
        courseName: {
          chinese: "資料結構",
          english: "Data Structures",
        },
        credits: 3,
        grade: null,
      },
      {
        courseName: {
          chinese: "體育(法式滾球)(上)",
          english: "Physical Education (Petanque) (I)",
        },
        grade: null,
        credits: 0,
      },
      {
        courseName: {
          chinese: "管理數學",
          english: "Mathematics for Management",
        },
        credits: 3,
        grade: null,
      },
      {
        courseName: {
          chinese: "資料庫管理系統",
          english: "Database Management Systems",
        },
        credits: 3,
        grade: null,
      },
      {
        courseName: {
          chinese: "統計學(上)",
          english: "Statistics (I)",
        },
        credits: 3,
        grade: null,
      },
      {
        courseName: {
          chinese: "色彩與生活",
          english: "Color and Life",
        },
        credits: 2,
        grade: "A",
      },
      {
        courseName: {
          chinese: "大數據與程式設計導論",
          english: "Introduction of Big Data and Programming",
        },
        credits: 2,
        grade: null,
      },
      {
        courseName: {
          chinese: "網頁製作",
          english: "Webpages Development",
        },
        credits: 3,
        grade: null,
      },
      {
        courseName: {
          chinese: "文法與修辭",
          english: "Grammar and Rhetoric",
        },
        credits: 2,
        grade: null,
      },
    ],
  },
};

export default NTUST;
