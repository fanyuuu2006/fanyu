// 單位數字
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Year = `${number}`;
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
  ? D extends Exclude<Day, "29" | "30" | "31">
    ? true
    : false
  : M extends "04" | "06" | "09" | "11"
    ? D extends Exclude<Day, "31">
      ? true
      : false
    : true;

type YYMM = `${Year}-${Month}`;
type YYMMDD =
  `${Year}-${Month}-${Day}` extends `${infer Y}-${infer M}-${infer D}`
    ? Y extends Year
      ? M extends Month
        ? D extends Day
          ? IsValidDate<M, D> extends true
            ? `${Y}-${M}-${D}`
            : never
          : never
        : never
      : never
    : never;

// 嚴謹的日期字符串類型
export type DateString = YYMM | YYMMDD;
