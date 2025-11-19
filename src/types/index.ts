// 單位數字
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 年份：1900–2099
type Year =
  | `19${Digit}${Digit}` // 1900–1999
  | `20${Digit}${Digit}`; // 2000–2099

// 月份：01–12
type Month =
  | `0${Exclude<Digit, 0>}` // 01–09
  | `1${0 | 1 | 2}`; // 10–12

// 日期：01–31
type Day =
  | `0${Exclude<Digit, 0>}` // 01–09
  | `1${Digit}` // 10–19
  | `2${Digit}` // 20–29
  | `3${0 | 1}`; // 30–31

type IsValidDate<M extends Month, D extends Day> = M extends "02"
  ? D extends Exclude<Day, "30" | "31">
    ? D
    : never
  : M extends "04" | "06" | "09" | "11"
  ? D extends Exclude<Day, "31">
    ? D
    : never
  : D;

type YYMM = `${Year}-${Month}`;
type YYMMDD =
  `${Year}-${Month}-${Day}` extends `${infer Y}-${infer M}-${infer D}`
    ? M extends Month
      ? D extends Day
        ? IsValidDate<M, D> extends never
          ? never
          : `${Y}-${M}-${D}`
        : never
      : never
    : never;

// 嚴謹的日期字符串類型
export type DateString = YYMM | YYMMDD;

export const t1: DateString = "2024-06";
export const t2: DateString = "2023-02-29"; // 錯誤，2023 不是閏年
export const t3: DateString = "2020-02-29";
