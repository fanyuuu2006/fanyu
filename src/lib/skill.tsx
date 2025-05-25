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
      src: "/Skills/typescript.svg",
    },
    {
      title: "JavaScript",
      src: "/Skills/javascript.svg",
    },

    {
      title: "HTML 5",
      src: "/Skills/html.svg",
    },
    {
      title: "CSS 3",
      src: "/Skills/css.svg",
    },
    {
      title: "React",
      src: "/Skills/react.svg",
    },
    {
      title: "Next.js",
      src: "/Skills/nextjs.svg",
    },
    {
      title: "Ant Design",
      src: "/Skills/antdesign.svg",
    },
    {
      title: "Tailwind CSS",
      src: "/Skills/tailwindcss.svg",
    },
    {
      title: "ESLint",
      src: "/Skills/eslint.svg",
    },
  ],
  backend: [
    { title: "Node.js", src: "/Skills/nodejs.svg" },
    { title: "Express", src: "/Skills/express.svg" },
    { title: "Python", src: "/Skills/python.svg" },
    { title: "Flask", src: "/Skills/flask.svg" },
  ],
  devtools: [
    {
      title: "Git",
      src: "/Skills/git.svg",
    },
    {
      title: "Visual Studio Code",
      src: "/Skills/vscode.svg",
    },
    {
      title: "Vercel",
      src: "/Skills/vercel.svg",
    },
    {
      title: "Markdown",
      src: "/Skills/markdown.svg",
    },
  ],
};

export const skillCategoryIcons: Record<SkillCategory, React.ReactNode> = {
  frontend: <LayoutOutlined />,
  backend: <DatabaseOutlined />,
  devtools: <ToolOutlined />,
};
