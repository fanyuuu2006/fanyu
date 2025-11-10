// 年份
type Year = `${number}`;

// 月份
type Month31 = "01" | "03" | "05" | "07" | "08" | "10" | "12";
type Month30 = "04" | "06" | "09" | "11";
type February = "02";

// 日期
type Day31 =
  | "01" | "02" | "03" | "04" | "05"
  | "06" | "07" | "08" | "09" | "10"
  | "11" | "12" | "13" | "14" | "15"
  | "16" | "17" | "18" | "19" | "20"
  | "21" | "22" | "23" | "24" | "25"
  | "26" | "27" | "28" | "29" | "30"
  | "31";

type Day30 = Exclude<Day31, "31">;
type Day28 = Exclude<Day31, "29" | "30" | "31">;

// 合法日期
type DateMonthDay =
  | `${Month31}-${Day31}`
  | `${Month30}-${Day30}`
  | `${February}-${Day28}`;

// 最終格式
export type DateString = `${Year}-${DateMonthDay}` | `${Year}-${Month31 | Month30 | February}`;
