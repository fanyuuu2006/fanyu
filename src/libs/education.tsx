import { ExperienceItem } from "@/types/experience";
import { LinkOutlined, EnvironmentOutlined } from "@ant-design/icons";

export const NTUST: ExperienceItem = {
  name: {
    chinese: "國立臺灣科技大學",
    english: "National Taiwan University of Science and Technology",
  },
  department: {
    chinese: "資訊管理系",
    english: "Department of Information Management",
  },
  role: {
    chinese: "就讀中",
    english: "Currently Enrolled",
  },
  duration: { start: "2024-09", end: null },
  links: [
    {
      chinese: "國立臺灣科技大學官網",
      english:
        "National Taiwan University of Science and Technology Official Website",
      icon: <LinkOutlined />,
      href: "https://www.ntust.edu.tw/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rzro8g26H8Pb1f1EA",
    },
  ],
  imageSrc: "https://upload.wikimedia.org/wikipedia/zh/b/b1/Taiwan_Tech_Logo.svg",
};

export const CPSHS: ExperienceItem = {
  name: {
    chinese: "私立治平高級中學",
    english: "Chih Ping Senior High School",
  },
  department: {
    chinese: "電子商務科",
    english: "Department of Electronic Commerce",
  },
  role: {
    chinese: "高職畢業",
    english: "Vocational High School Diploma",
  },
  duration: { start: "2021-09", end: "2024-06" },
  links: [
    {
      chinese: "私立治平高級中學官網",
      english: "Chih Ping Senior High School Official Website",
      icon: <LinkOutlined />,
      href: "https://www.cpshs.tyc.edu.tw/",
    },
    {
      chinese: "臺灣省桃園市楊梅區",
      english: "Yangmei District, Taoyuan City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/PoxfwWMvbdLbpSMH8",
    },
  ],
  imageSrc: "https://upload.wikimedia.org/wikipedia/zh/8/80/Chih_Ping_Senior_High_School_Logo.gif",
};

export const FGJH: ExperienceItem = {
  name: {
    chinese: "新竹縣立富光國民中學",
    english: "Fu Guang Junior High School",
  },
  role: {
    chinese: "國中畢業",
    english: "Junior High School Diploma",
  },
  duration: { start: "2018-09", end: "2021-06" },
  links: [
    {
      chinese: "新竹縣立富光國民中學官網",
      english: "Fu Guang Junior High School Official Website",
      icon: <LinkOutlined />,
      href: "https://fgjh.hcc.edu.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/FZ1kwUBVNgYHk8Uj8",
    },
  ],
  imageSrc: "https://fgjh.hcc.edu.tw/var/file/14/1014/img/1/102403877.jpg",
};

export const GSES: ExperienceItem = {
  name: {
    chinese: "新竹縣立關西國民小學",
    english: "Guan Shi Elementary School",
  },
  role: {
    chinese: "國小畢業",
    english: "Elementary School Diploma",
  },
  duration: { start: "2012-09", end: "2018-06" },
  links: [
    {
      chinese: "新竹縣立關西國民小學官網",
      english: "Guan Shi Elementary School Official Website",
      icon: <LinkOutlined />,
      href: "https://gses.hcc.edu.tw/",
    },
    {
      chinese: "臺灣省新竹縣關西鎮",
      english: "Guanxi Township, Hsinchu County, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rpe6AUrEDmfryADM8",
    },
  ],
  imageSrc: "https://gses.hcc.edu.tw/var/file/63/1063/msys_1063_9975114_41652.png",
};
