import { ExperienceItem } from "@/types/experience";
import {
  LinkOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const GSES: ExperienceItem = {
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
  imageSrc:
    "https://gses.hcc.edu.tw/var/file/63/1063/msys_1063_9975114_41652.png",
  description: ({ language }) => (
    <div className="flex flex-col gap-4">
      {[
        {
          icon: IdcardOutlined,
          label: { chinese: "學生證號", english: "Student ID" },
          content: {
            chinese: "1010010",
            english: "1010010",
          },
        },
      ].map((chunk, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3  rounded-2xl border border-(--border-color)"
        >
          <chunk.icon className="text-xl shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-(--text-color-muted)">
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

export default GSES;
