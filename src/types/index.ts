// 單位數
type Units = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 四位數年份
type Year = `${number}${number}${number}${number}`;

// 月份：01–12
type Month =
  | `0${Exclude<Units, 0>}` // 01–09
  | `1${0 | 1 | 2}`; // 10–12

// 日期：01–31
type Day =
  | `0${Exclude<Units, 0>}` // 01–09
  | `1${Units}`             // 10–19
  | `2${Units}`             // 20–29
  | `3${0 | 1}`;            // 30–31

export type DateString =
  | `${Year}-${Month}-${Day}`
  | `${Year}-${Month}`;
