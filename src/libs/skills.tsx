import { SkillItem } from "@/types";

export const skillCategories: {
  label: string;
  list: SkillItem[];
}[] = [
  {
    label: "前端",
    list: [
      {
        title: "TypeScript",
        url: "https://www.typescriptlang.org/",
      },
      {
        title: "JavaScript",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript",
      },
      {
        title: "EcmaScript",
        url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/",
      },
      {
        title: "HTML",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/HTML",
      },
      {
        title: "CSS",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS",
      },
      {
        title: "Markdown",
        url: "https://www.markdownguide.org/",
      },
      {
        title: "React",
        url: "https://reactjs.org/",
      },
      {
        title: "Next.js",
        url: "https://nextjs.org/",
      },
      {
        title: "Ant Design",
        url: "https://ant.design/",
      },
      {
        title: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
    ],
  },
  {
    label: "後端",
    list: [
      {
        title: "Node.js",
        url: "https://nodejs.org/",
      },
      {
        title: "Express.js",
        url: "https://expressjs.com/",
      },
      {
        title: "Python",
        url: "https://www.python.org/",
      },
      {
        title: "Flask",
        url: "https://flask.palletsprojects.com/",
      },
      {
        title: "PostgreSQL",
        url: "https://www.postgresql.org/",
      },
    ],
  },
  {
    label: "開發工具",
    list: [
      {
        title: "Git",
        url: "https://git-scm.com/",
      },
      {
        title: "GitHub",
        url: "https://github.com/",
      },
      {
        title: "Visual Studio Code",
        url: "https://code.visualstudio.com/",
      },
      {
        title: "Cursor",
        url: "https://cursor.sh/",
      },
      {
        title: "ESLint",
        url: "https://eslint.org/",
      },
      {
        title: "npm",
        url: "https://www.npmjs.com/",
      },
      {
        title: "Vercel",
        url: "https://vercel.com/",
      },
      {
        title: "Supabase",
        url: "https://supabase.com/",
      },
    ],
  },
];
