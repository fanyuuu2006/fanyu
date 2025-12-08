import { ExperienceItem } from "@/types/experience";
import {
  LinkOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

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
    <div className="flex flex-col gap-4">
      {[
        {
          icon: IdcardOutlined,
          label: { chinese: "學生證號", english: "Student ID" },
          content: {
            chinese: "107004",
            english: "107004",
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

export default FGJH;
