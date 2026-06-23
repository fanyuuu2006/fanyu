import { EducationItem } from "@/types";

export const education: EducationItem[] = [
  {
    school: "國立臺灣科技大學",
    department: "資訊管理系",
    degree: "學士在學中",
    duration: {
      start: "2024-09",
    },
    link: "https://www.ntust.edu.tw/",
    logo: "https://upload.wikimedia.org/wikipedia/zh/b/b1/Taiwan_Tech_Logo.svg",
  },
  {
    school: "私立治平高級中學",
    department: "電子商務科",
    degree: "高職畢業",
    duration: {
      start: "2021-09",
      end: "2024-06",
    },
    link: "https://www.cpshs.tyc.edu.tw/",
    logo: "https://upload.wikimedia.org/wikipedia/zh/8/80/Chih_Ping_Senior_High_School_Logo.gif",
    points: [
      "四技二專統測數學、專業科目滿級分",
      "修習電子商務、商業管理、資訊應用與基礎程式設計",
      "取得電腦軟體應用乙級、會計事務（資訊）丙級證照",
    ],
  },
  {
    school: "新竹縣立富光國民中學",
    degree: "國中畢業",
    duration: {
      start: "2018-09",
      end: "2021-06",
    },
    link: "https://fgjh.hcc.edu.tw/",
    logo: "https://fgjh.hcc.edu.tw/var/file/14/1014/img/1/102403877.jpg",
    points: ["110 年國中教育會考數學、自然科皆獲 A"],
  },
  {
    school: "新竹縣立關西國民小學",
    degree: "國小畢業",
    duration: {
      start: "2012-09",
      end: "2018-06",
    },
    link: "https://gses.hcc.edu.tw/",
    logo: "https://gses.hcc.edu.tw/var/file/63/1063/msys_1063_9975114_41652.png",
  },
];
