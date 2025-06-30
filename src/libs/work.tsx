import { ExperienceItem } from "@/types/experience";
import { LinkOutlined, EnvironmentOutlined } from "@ant-design/icons";
import NTUST from "./education/ntust";

export const LFR: ExperienceItem = {
  name: {
    chinese: "六福莊生態渡假旅館",
    english: "Leofoo Resort",
  },
  role: {
    chinese: "臨時工讀生",
    english: "Temporary Part-Time Worker",
  },
  duration: { start: "2022-03", end: "2022-03" },
  imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT95Iei_oww6g8XyzyLemSlBJCFx9y8srqeBw&s",
  links: [
    {
      chinese: "六福莊官網",
      english: "Leofoo Resort Official Website",
      icon: <LinkOutlined />,
      href: "https://www.leofooresort.com.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/SJLFkVeApdBn51SC9",
    },
  ],
};

export const KNSH: ExperienceItem = {
  name: {
    chinese: "康軒文教集團桃園物流中心",
    english: "Kang Hsuan Educational Publishing Group Taoyuan Logistics Center",
  },
  role: {
    chinese: "暑期工讀生",
    english: "Summer Part-Time Worker",
  },
  duration: { start: "2024-06", end: "2024-07" },
  imageSrc: "https://www.knsh.com.tw/Template/2020/Images/fevicon/fevicon.gif",
  links: [
    {
      chinese: "康軒文教集團官網",
      english: "Kang Hsuan Educational Publishing Group Official Website",
      icon: <LinkOutlined />,
      href: "https://www.knsh.com.tw/",
    },
    {
      chinese: "臺灣省桃園市龍潭區",
      english: "Longtan District, Taoyuan City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/pYfSEkjiioLtjrJi6",
    },
  ],
};

export const LFV: ExperienceItem = {
  name: {
    chinese: "六福村主題遊樂園",
    english: "Leofoo Village Theme Paradise",
  },
  role: {
    chinese: "臨時工讀生",
    english: "Temporary Part-Time Worker",
  },
  duration: { start: "2024-08", end: "2024-08" },
  imageSrc: "https://alumnus.pccu.edu.tw/var/file/264/1264/img/2537/LINE_ALBUM_2022.4.26_220426_3.jpg",
  links: [
    {
      chinese: "六福村官網",
      english: "Leofoo Village Official Website",
      icon: <LinkOutlined />,
      href: "https://www.leofoovillage.com.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/5Pw8JPka4y6ozgT68",
    },
  ],
};

export const HXL: ExperienceItem = {
  name: {
    chinese: "豪享來麵店",
    english: "Hao Xiang Lai Noodle Shop",
  },
  role: {
    chinese: "工讀生",
    english: "Part-Time Worker",
  },
  organization: NTUST,
  duration: { start: "2024-10", end: null },
  imageSrc: "https://1.bp.blogspot.com/-4JBaaL7IXuo/XjV47f4Rc9I/AAAAAAAEnBU/g4K3C9kZKbM1P5gvuFJ3RQnygfgHAHrWACKgBGAsYHg/s1600/IMG_9510.HEIC",
  links: [
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/55EnRfHo8HUqbXvt8",
    },
  ],
};
