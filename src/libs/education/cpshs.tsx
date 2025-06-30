import { ExperienceItem } from "@/types/experience";
import { LinkOutlined, EnvironmentOutlined } from "@ant-design/icons";

const CPSHS: ExperienceItem = {
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
  imageSrc:
    "https://upload.wikimedia.org/wikipedia/zh/8/80/Chih_Ping_Senior_High_School_Logo.gif",
  description: ({ language }) => (
    <div className="flex flex-col">
      <span className="text-lg font-bold">
        {
          {
            chinese: "學號: 013057",
            english: "Student ID: 013057",
          }[language]
        }
      </span>
    </div>
  ),
};

export default CPSHS;