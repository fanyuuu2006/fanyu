// 單位數字
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 四位數年份（限制年份範圍為 1900-2099）
type Year =
  | `19${Digit}${Digit}` // 1900-1999
  | `20${Digit}${Digit}` // 2000-2099
  | `21${0 | 1}${Digit}`; // 2100-2119 (預留未來使用)

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

// 更嚴謹的日期字符串類型
export type DateString =
  | _DateString<`${Year}-${Month}`> // 年月格式 YYYY-MM
  | _DateString<`${Year}-${Month}-${Day}`>; // 完整日期格式 YYYY-MM-DD

export type _DateString<T extends string> =
  // ✅ 檢查 YYYY-MM
  T extends `${Year}-${Month}`
    ? T
    : T extends `${infer Y}-${infer M}-${infer D}` // ✅ 檢查 YYYY-MM-DD
    ? Y extends Year
      ? M extends Month
        ? D extends Day
          ? M extends "02"
            ? D extends Exclude<Day, "30" | "31">
              ? T
              : never
            : M extends "04" | "06" | "09" | "11"
            ? D extends Exclude<Day, "31">
              ? T
              : never
            : T
          : never
        : never
      : never
    : never;