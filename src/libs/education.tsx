import { ExperienceItem } from "@/types/experience";

export const education: ExperienceItem[] = [
  {
    title: "國立臺灣科技大學",
    subtitle: "資訊管理系 在學中",
    duration: {
      start: "2024-09",
    },
    link: "https://www.ntust.edu.tw/",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/zh/b/b1/Taiwan_Tech_Logo.svg",
  },
  {
    title: "私立治平高級中學",
    subtitle: "電子商務科 畢業",
    duration: {
      start: "2021-09",
      end: "2024-06",
    },
    link: "https://www.cpshs.tyc.edu.tw/",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/zh/8/80/Chih_Ping_Senior_High_School_Logo.gif",
    description: `
- 四技二專統測數學、專業科目滿級分
- 修習電子商務、商業管理、資訊應用與基礎程式設計
- 取得電腦軟體應用乙級、會計事務（資訊）丙級證照
    `,
  },
  {
    title: "新竹縣立富光國民中學",
    subtitle: "畢業",
    duration: {
      start: "2018-09",
      end: "2021-06",
    },
    link: "https://fgjh.hcc.edu.tw/",
    imgSrc: "https://fgjh.hcc.edu.tw/var/file/14/1014/img/1/102403877.jpg",
    description: "- 110 年國中教育會考數學、自然科皆獲 A",
  },
  {
    title: "新竹縣立關西國民小學",
    subtitle: "畢業",
    duration: {
      start: "2012-09",
      end: "2018-06",
    },
    link: "https://gses.hcc.edu.tw/",
    imgSrc:
      "https://gses.hcc.edu.tw/var/file/63/1063/msys_1063_9975114_41652.png",
  },
];
