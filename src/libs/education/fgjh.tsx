import { ExperienceItem } from "@/types/experience";
import { LinkOutlined, EnvironmentOutlined } from "@ant-design/icons";

const FGJH: ExperienceItem = {
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
  description: ({ language }) => (
    <div className="flex flex-col">
      <span className="text-lg font-bold">
        {
          {
            chinese: "學號: 107004",
            english: "Student ID: 107004",
          }[language]
        }
      </span>
    </div>
  ),
};

export default FGJH;
