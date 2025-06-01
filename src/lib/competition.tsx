import { ExperienceItem } from "@/types/experience";
import {
  EnvironmentOutlined,
  FileOutlined,
  InstagramOutlined,
  LinkOutlined,
} from "@ant-design/icons";

export const PDAO: ExperienceItem = {
  name: {
    chinese: "PDAO 2025",
    english: "PDAO 2025",
  },
  role: {
    chinese: "隊員",
    english: "Member",
  },
  duration: { start: "2025-04", end: "2025-04" },
  imageSrc:
    "https://megapx-assets.dcard.tw/images/e28d73e6-a9b0-4449-854e-2b8b50dbb6b6/orig.jpeg",
  links: [
    {
      chinese: "PDAO Instagram",
      english: "PDAO Instagram",
      icon: <InstagramOutlined />,
      href: "https://www.instagram.com/pdao_ntuim/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/MvSK9ZHVXD2GiGvA9",
    },
  ],
  description: ({ language }) => (
    <div className="flex flex-col hint font-bold">
      <span>
        {
          {
            chinese: "隊名: 不知道對不隊",
            english: "Team Name: Not Sure If It's the Right Team",
          }[language]
        }
      </span>
      <span>
        {
          {
            chinese: "名次: 59",
            english: "Rank: 59",
          }[language]
        }
      </span>
    </div>
  ),
};

export const HCCGM: ExperienceItem = {
  name: {
    chinese: "新竹縣國民中學創新思考金頭腦數學競賽",
    english:
      "Hsinchu County Junior High School Innovative Thinking Golden Mind Math Competition",
  },
  department: {
    chinese: "富光國中",
    english: "Fu Guang Junior High School",
  },
  role: {
    chinese: "隊員",
    english: "Member",
  },
  duration: { start: "2021-01", end: "2021-01" },
  imageSrc: undefined,
  links: [
    {
      chinese: "金頭腦數學競賽官網",
      english: "Golden Mind Math Competition Official Website",
      icon: <LinkOutlined />,
      href: "https://sites.google.com/view/hccgoldenmind/",
    },
    {
      chinese: "臺灣省新竹縣新豐鄉",
      english: "Xinfeng Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/KJsTatVSbbJhiCKx8",
    },
  ],
  description: ({ language }) => (
    <span className="note font-bold">
      {
        { chinese: "團體組 第 2 名", english: "2nd Place, Team Category" }[
          language
        ]
      }
    </span>
  ),
};

export const SE: ExperienceItem = {
  name: {
    chinese: "全國高級中等學校小論文寫作比賽",
    english: "National Senior High School Short Essay Writing Competition",
  },
  department: {
    chinese: "1130315梯次 桃園區 商業類",
    english: "1130315 Session Taoyuan District Commerce Class",
  },
  role: {
    chinese: "組員",
    english: "Team Member",
  },
  duration: { start: "2023-11", end: "2024-03" },
  imageSrc: "https://www.shs.edu.tw/favicon.ico",
  links: [
    {
      chinese: "中學生網站",
      english: "Senior High School Website",
      icon: <LinkOutlined />,
      href: "https://www.shs.edu.tw/",
    },
  ],
  description: ({ language }) => (
    <div className="flex flex-col hint font-bold">
      <span>
        {
          {
            chinese:
              '主題名稱:  疫情後消費者對電商平台使用現狀-以"蝦皮購物"為例',
            english:
              "Topic Name: Consumer Usage of E-commerce Platforms after the Pandemic – A Case Study on Shopee",
          }[language]
        }
      </span>
      <span>
        {
          {
            chinese: "名次: 甲等",
            english: "Rank: Grade A",
          }[language]
        }
      </span>
    </div>
  ),
};

export const XLS: ExperienceItem = {
  name: {
    chinese: "2023 全國新零售競賽",
    english: "2023 National New Retail Competition",
  },
  role: {
    chinese: "組員",
    english: "Team Member",
  },
  duration: { start: "2023-09", end: "2024-01" },
  imageSrc:
    "https://cdn.bountyhunter.co/file/449c46e0-c304-4b33-97f7-d5cd1919ad40.png?size=640",
  links: [
    {
      chinese: "競賽簡章",
      english: "Competition Brief",
      icon: <FileOutlined />,
      href: "https://drive.google.com/file/d/1MrXpOsCER-Fn3uTn1RivpJBt3pkLl81g/view",
    },
  ],
  description: ({ language }) => (
    <div className="flex flex-col hint font-bold">
      <span>
        {
          {
            chinese: "隊名: 你在偷喵我吼?",
            english: "Team Name: Are You Secretly Meow-ing at Me?",
          }[language]
        }
      </span>
      <span>
        {
          {
            chinese: "挑戰完成獎",
            english: "Challenge Completed Award",
          }[language]
        }
      </span>
    </div>
  ),
};

export const PVQC2021: ExperienceItem = {
  name: {
    chinese: "2021 專業英日文詞彙與聽力能力大賽",
    english:
      "2021 Professional English and Japanese Vocabulary and Listening Ability Competition",
  },
  department: {
    chinese: "商業與管理 類 北二區賽",
    english: "Business and Management Category, Northern Region 2",
  },
  duration: { start: "2021-11", end: "2021-11" },
  imageSrc:
    "https://news.idea-show.com/wp-content/uploads/2017/06/GLAD%E5%85%A8%E7%90%83%E5%AD%B8%E7%BF%92%E8%88%87%E6%B8%AC%E8%A9%95%E7%99%BC%E5%B1%95%E4%B8%AD%E5%BF%83.png",
  links: [
    {
      chinese: "競賽官網",
      english: "Competition Website",
      icon: <LinkOutlined />,
      href: "https://sites.google.com/view/gladworldcontest/%E5%A4%A7%E8%B3%BD%E6%B4%BB%E5%8B%95%E7%85%A7%E7%89%87%E8%88%87%E5%BD%B1%E7%89%87/2021%E5%B9%B4%E5%A4%A7%E8%B3%BD%E6%B4%BB%E5%8B%95%E7%85%A7%E7%89%87%E8%88%87%E5%BD%B1%E7%89%87",
    },
  ],
};

export const PVQC2022: ExperienceItem = {
  name: {
    chinese: "2022 專業英日文詞彙與聽力能力大賽",
    english:
      "2022 Professional English and Japanese Vocabulary and Listening Ability Competition",
  },
  department: {
    chinese: "資訊(計算機) 類 北二區賽",
    english: "Information(Computer) Category, Northern Region 2",
  },
  duration: { start: "2022-12", end: "2022-12" },
  imageSrc:
    "https://news.idea-show.com/wp-content/uploads/2017/06/GLAD%E5%85%A8%E7%90%83%E5%AD%B8%E7%BF%92%E8%88%87%E6%B8%AC%E8%A9%95%E7%99%BC%E5%B1%95%E4%B8%AD%E5%BF%83.png",
  links: [
    {
      chinese: "競賽官網",
      english: "Competition Website",
      icon: <LinkOutlined />,
      href: "https://sites.google.com/view/gladworldcontest/%E5%A4%A7%E8%B3%BD%E6%B4%BB%E5%8B%95%E7%85%A7%E7%89%87%E8%88%87%E5%BD%B1%E7%89%87/2022%E5%B9%B4%E5%A4%A7%E8%B3%BD%E6%B4%BB%E5%8B%95%E7%85%A7%E7%89%87%E8%88%87%E5%BD%B1%E7%89%87",
    },
  ],
};
