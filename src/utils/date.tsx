export type DateFormatToken =
  | "YYYY"
  | "MM"
  | "DD"
  | "HH"
  | "hh"
  | "mm"
  | "ss"
  | "A";

// 單一事實來源:token 清單同時用來產生 regex,避免兩處維護不同步
const DATE_FORMAT_TOKENS: DateFormatToken[] = [
  "YYYY",
  "MM",
  "DD",
  "HH",
  "hh",
  "mm",
  "ss",
  "A",
];

const TOKEN_REGEX = new RegExp(DATE_FORMAT_TOKENS.join("|"), "g");

const pad2 = (n: number): string => String(n).padStart(2, "0");

/**
 * 格式化日期字串
 *
 * @param format 格式字串 (YYYY:年, MM:月, DD:日, HH:24時, hh:12時, mm:分, ss:秒, A:AM/PM)
 * @param input 欲格式化的日期,可為 Date 物件、timestamp 或日期字串;預設為現在時間
 * @returns 格式化後的字串
 * @throws {RangeError} 當 input 無法被解析為有效日期時拋出
 *
 * @example
 * formatDate("YYYY-MM-DD HH:mm:ss") // "2026-07-12 14:30:00"
 * formatDate("YYYY/MM/DD", "2026-01-01") // "2026/01/01"
 */
export const formatDate = (
  format: string,
  input: Date | number | string,
): string => {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`formatDate: 無法解析的日期輸入 "${String(input)}"`);
  }

  const hours = date.getHours();

  const map: Record<DateFormatToken, string> = {
    YYYY: String(date.getFullYear()),
    MM: pad2(date.getMonth() + 1),
    DD: pad2(date.getDate()),
    HH: pad2(hours),
    hh: pad2(hours % 12 || 12),
    mm: pad2(date.getMinutes()),
    ss: pad2(date.getSeconds()),
    A: hours >= 12 ? "PM" : "AM",
  };

  return format.replace(TOKEN_REGEX, (token) => map[token as DateFormatToken]);
};

export const toISODateTime = (date: string) => {
  const [year, month = "01", day = "01"] = date.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
