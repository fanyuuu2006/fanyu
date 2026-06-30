// utils/date.ts
export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  if (!year) return date;
  if (!month) return `${year} 年`;
  if (!day) return `${year} 年 ${month} 月`;
  return `${year} 年 ${month} 月 ${day} 日`;
};

export const toISODateTime = (date: string) => {
  const [year, month = "01", day = "01"] = date.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};