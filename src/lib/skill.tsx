import { SkillCategory } from "@/types/skill";
import {
  DatabaseOutlined,
  LayoutOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export const skillCategories = ["frontend", "backend", "devtools"] as const;

export const skills: Record<SkillCategory, { src: string; title: string }[]> = {
  frontend: [
    {
      title: "TypeScript",
      src: "https://www.svgrepo.com/show/374146/typescript-official.svg",
    },
    {
      title: "JavaScript",
      src: "https://www.svgrepo.com/show/373705/js-official.svg",
    },

    {
      title: "HTML 5",
      src: "https://www.svgrepo.com/show/373669/html.svg",
    },
    {
      title: "CSS 3",
      src: "https://www.svgrepo.com/show/373535/css.svg",
    },
    {
      title: "React",
      src: "https://www.svgrepo.com/show/354259/react.svg",
    },
    {
      title: "Next.js",
      src: "https://camo.githubusercontent.com/c3635f27439ecdbf20e3cbf969c156f4040f10a0c8c836cf307d916dd8f806d4/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6461726b5f6261636b67726f756e642e706e67",
    },
    {
      title: "Ant Design",
      src: "https://www.svgrepo.com/show/353401/ant-design.svg",
    },
    {
      title: "Tailwind CSS",
      src: "https://www.svgrepo.com/show/354431/tailwindcss-icon.svg",
    },
    {
      title: "ESLint",
      src: "https://www.svgrepo.com/show/353709/eslint.svg",
    },
  ],
  backend: [
    { title: "Node.js", src: "https://www.svgrepo.com/show/373929/node.svg" },
    { title: "Python", src: "https://www.svgrepo.com/show/452091/python.svg" },
  ],
  devtools: [
    {
      title: "Git",
      src: "https://www.svgrepo.com/show/452210/git.svg",
    },
    {
      title: "Visual Studio Code",
      src: "https://www.svgrepo.com/show/452129/vs-code.svg",
    },
  ],
};

export const skillCategoryIcons: Record<SkillCategory, React.ReactNode> = {
  frontend: <LayoutOutlined />,
  backend: <DatabaseOutlined />,
  devtools: <ToolOutlined />,
};
