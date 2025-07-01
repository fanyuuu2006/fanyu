import { Semester, Course, ExperienceItem } from "@/types/experience";
import { calculateGPA } from "@/utils/education";
import { LinkOutlined, EnvironmentOutlined } from "@ant-design/icons";
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

    return (
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">
          {
            {
              chinese: "學號: B11309044",
              english: "Student ID: B11309044",
            }[language]
          }
        </span>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full bg-[var(--background-color-secondary)] table-auto border-collapse">
            <thead className="text-sm md:text-lg bg-gradient">
              <tr>
                <th className="text-center p-2 border-b border-white/10">
                  {
                    {
                      chinese: "學期",
                      english: "Semester",
                    }[language]
                  }
                </th>
                <th className="text-center p-2">
                  {
                    {
                      chinese: "班級排名",
                      english: "Class Rank",
                    }[language]
                  }
                </th>
                <th className="text-center p-2">
                  {
                    {
                      chinese: "系所排名",
                      english: "Department Rank",
                    }[language]
                  }
                </th>
                <th className="text-center p-2">
                  {
                    {
                      chinese: "平均成績",
                      english: "GPA",
                    }[language]
                  }
                </th>
                <th className="text-center p-2">
                  {
                    {
                      chinese: "學分數",
                      english: "Credits",
                    }[language]
                  }
                </th>
              </tr>
            </thead>
            <tbody className="text-base md:text-xl">
              {Object.entries(grades).map(([year, data]) => {
                const { gpa, totalCredits } = calculateGPA(data.courses);
                const modal = useModal();
                return (
                  <React.Fragment key={year}>
                    <tr
                      className="hover:backdrop-brightness-125 cursor-pointer"
                      onClick={modal.Open}
                    >
                      <td className="text-center p-2">{year}</td>
                      <td className="text-center p-2">
                        {data.classRank ||
                          { chinese: "無資料", english: "No Data" }[language]}
                      </td>
                      <td className="text-center p-2">
                        {data.departmentRanK ||
                          { chinese: "無資料", english: "No Data" }[language]}
                      </td>
                      <td className="text-center p-2">
                        {Math.round(gpa * 100) / 100}
                      </td>
                      <td className="text-center p-2">{totalCredits}</td>
                    </tr>
                    <modal.Container >
                      <div className="rounded-2xl animate-pop overflow-hidden">
                        <table className="w-full bg-[var(--background-color-secondary)] table-auto border-collapse">
                          <thead className="text-sm md:text-lg bg-gradient">
                            <tr>
                              <th className="text-center p-2">
                                {
                                  {
                                    chinese: "課程名稱",
                                    english: "Course Name",
                                  }[language]
                                }
                              </th>
                              <th className="text-center p-2">
                                {
                                  {
                                    chinese: "成績",
                                    english: "Grade",
                                  }[language]
                                }
                              </th>
                              <th className="text-center p-2">
                                {
                                  {
                                    chinese: "學分數",
                                    english: "Credits",
                                  }[language]
                                }
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-base md:text-xl">
                            {data.courses.map((course, index) => (
                              <tr
                                key={index}
                                className="hover:backdrop-brightness-125"
                              >
                                <td className="text-center p-2">
                                  {course.courseName[language]}
                                </td>
                                <td className="text-center p-2">
                                  {course.grade ||
                                    { chinese: "無資料", english: "No Data" }[
                                      language
                                    ]}
                                </td>
                                <td className="text-center p-2">
                                  {course.credits}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="text-lg md:text-xl">
                            <tr>
                              <td className="text-center p-2">
                                {
                                  {
                                    chinese: "總計",
                                    english: "Total",
                                  }[language]
                                }
                              </td>
                              <td className="text-center p-2"></td>
                              <td className="text-center p-2">
                                {totalCredits}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </modal.Container>
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot className="text-lg md:text-xl">
              <tr>
                <td className="text-center p-2">
                  {
                    {
                      chinese: "總計",
                      english: "Total",
                    }[language]
                  }
                </td>
                <td className="text-center p-2"></td>
                <td className="text-center p-2"></td>
                <td className="text-center p-2 font-bold">
                  {Math.round(overallGPA.gpa * 100) / 100}
                </td>
                <td className="text-center p-2 font-bold">
                  {overallGPA.totalCredits}
                </td>
              </tr>
            </tfoot>
          </table>
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
};

export default NTUST;
