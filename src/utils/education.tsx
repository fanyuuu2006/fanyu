import { Course, Grade } from "@/types/experience";

/**
 * 計算 GPA
 * @param courses - 課程列表
 * @return 包含 GPA 和總學分的物件
 * @example
 * ```typescript
 * const courses = [
 *   { courseName: { chinese: "數學", english: "Mathematics" }, grade: "A", credits: 3 },
 *   { courseName: { chinese: "物理", english: "Physics" }, grade: "B+", credits: 4 },
 * ];
 * const result = calculateGPA(courses);
 * console.log(result.gpa); // 3.65
 * console.log(result.totalCredits); // 7
 * ```
 */
export const calculateGPA = (
  courses: Course[]
): {
  gpa: number;
  totalCredits: number;
} => {
  const _map: Record<Grade, number> = {
    "A+": 4,
    A: 4,
    "A-": 3.7,
    "B+": 3.3,
    B: 3,
    "B-": 2.7,
    "C+": 2.3,
    C: 2,
    "C-": 1.7,
    "D+": 1.3,
    E: 1,
    X: 0,
  };

  let totalPoints = 0;
  let totalCredits = 0;
  for (const course of courses) {
    if (!course.credits) {
      continue; // 忽略學分為 0 的課程
    }
    if (!course.grade || !(course.grade in _map)) {
      continue; // 忽略沒有成績或成績不在映射中的課程
    }
    const gradePoints = _map[course.grade];
    totalPoints += gradePoints * course.credits;
    totalCredits += course.credits;
  }
  if (totalCredits === 0) {
    return { gpa: 0, totalCredits: 0 };
  }
  const gpa = totalPoints / totalCredits;

  // 沒有等第成績但有學分的課程仍要算
    for (const course of courses) {
        if (course.credits && (!course.grade || !(course.grade in _map))) {
        totalCredits += course.credits; // 將學分加到總學分中
        }
    }

  return { gpa, totalCredits };
};
