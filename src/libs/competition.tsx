import { ExperienceItem } from "@/types/experience";
import {
  EnvironmentOutlined,
  FileOutlined,
  InstagramOutlined,
  LinkOutlined,
  PictureOutlined,
  TrophyOutlined,
  TeamOutlined,
  BookOutlined,
  StarOutlined,
  CrownOutlined,
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
    {
      chinese: "活動照片相簿",
      english: "Photo Album",
      icon: <PictureOutlined />,
      href: "/album/2025/PDAO%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88%E7%AB%B6%E8%B3%BD",
    },
  ],
  description: ({ language }) => (
    <div className="flex flex-col gap-4">
      {[
        {
          icon: TeamOutlined,
          label: { chinese: "隊伍名稱", english: "Team Name" },
          content: {
            chinese: "不知道對不隊",
            english: "Not Sure If It's the Right Team",
          },
        },
        {
          icon: TrophyOutlined,
          label: { chinese: "參賽成績", english: "Competition Result" },
          content: {
            chinese: "第 59 名",
            english: "59th Place",
          },
        },
      ].map((chunk, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3  rounded-2xl border border-[var(--border-color)]"
        >
          <chunk.icon className="text-xl flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-color-muted)]">
              {chunk.label[language]}
            </span>
            <span className="text-base font-semibold">
              {chunk.content[language]}
            </span>
          </div>
        </div>
      ))}
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
  imageSrc: "/api/image/1aPifYS-OcfKdp01OCzz6acKKK_3A1Huo",
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
    {
      chinese: "活動照片相簿",
      english: "Photo Album",
      icon: <PictureOutlined />,
      href: "/album/2021/%E6%95%B8%E5%AD%B8%E9%87%91%E9%A0%AD%E8%85%A6%E7%AB%B6%E8%B3%BD",
    },
  ],
  description: ({ language }) => (
    <div className="bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-tertiary)] flex items-center justify-center p-3 rounded-xl">
      <div className="text-lg md:text-xl flex items-center gap-2 text-white">
        <CrownOutlined className=" flex-shrink-0" />
        <span className="font-bold">
          {
            {
              chinese: "團體賽 (丙組) 第 2 名",
              english: "2nd Place in Team Competition (Group C)",
            }[language]
          }
        </span>
      </div>
    </div>
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
    <div className="flex flex-col gap-4">
      {[
        {
          icon: BookOutlined,
          label: { chinese: "研究主題", english: "Research Topic" },
          content: {
            chinese: '疫情後消費者對電商平台使用現狀 - 以"蝦皮購物"為例',
            english:
              "Consumer Usage of E-commerce Platforms after the Pandemic – A Case Study on Shopee",
          },
        },
        {
          icon: StarOutlined,
          label: { chinese: "獲獎等級", english: "Award Level" },
          content: {
            chinese: "甲等",
            english: "Grade A",
          },
        },
      ].map((chunk, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3  rounded-2xl border border-[var(--border-color)]"
        >
          <chunk.icon className="text-xl flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-color-muted)]">
              {chunk.label[language]}
            </span>
            <span className="text-base font-semibold">
              {chunk.content[language]}
            </span>
          </div>
        </div>
      ))}
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
    <div className="flex flex-col gap-4">
      {[
        {
          icon: TeamOutlined,
          label: { chinese: "隊伍名稱", english: "Team Name" },
          content: {
            chinese: "你在偷喵我吼?",
            english: "Are You Secretly Meow-ing at Me?",
          },
        },
        {
          icon: TrophyOutlined,
          label: { chinese: "參賽成績", english: "Competition Result" },
          content: {
            chinese: "挑戰完成獎",
            english: "Challenge Completed Award",
          },
        },
      ].map((chunk, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3  rounded-2xl border border-[var(--border-color)]"
        >
          <chunk.icon className="text-xl flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-color-muted)]">
              {chunk.label[language]}
            </span>
            <span className="text-base font-semibold">
              {chunk.content[language]}
            </span>
          </div>
        </div>
      ))}
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
    {
      chinese: "臺灣省桃園市中壢區",
      english: "Taoyuan City, Zhongli District, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/GLQw8GLzCRiNSCup6",
    },
    {
      chinese: "活動照片相簿",
      english: "Photo Album",
      icon: <PictureOutlined />,
      href: "/album/2021/PVQC-%E5%8C%97%E4%BA%8C%E5%8D%80%E8%B3%BD",
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
    {
      chinese: "臺灣省桃園市中壢區",
      english: "Taoyuan City, Zhongli District, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/GLQw8GLzCRiNSCup6",
    },
  ],
};
