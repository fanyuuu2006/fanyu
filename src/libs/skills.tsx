import CssSvg from "@/components/svgs/CssSvg";
import EcmaScriptSvg from "@/components/svgs/EcmaScriptSvg";
import EsLintSvg from "@/components/svgs/EsLintSvg";
import ExpressJsSvg from "@/components/svgs/ExpressJsSvg";
import FlaskSvg from "@/components/svgs/FlaskSvg";
import GithubSvg from "@/components/svgs/GithubSvg";
import GitSvg from "@/components/svgs/GitSvg";
import HtmlSvg from "@/components/svgs/HtmlSvg";
import JavaScriptSvg from "@/components/svgs/JavaScriptSvg";
import NextJsSvg from "@/components/svgs/NextJsSvg";
import NodeJsSvg from "@/components/svgs/NodeJsSvg";
import NpmSvg from "@/components/svgs/NpmSvg";
import PostgreSqlSvg from "@/components/svgs/PostgreSqlSvg";
import PythonSvg from "@/components/svgs/PythonSvg";
import ReactSvg from "@/components/svgs/ReactSvg";
import TailwindCssSvg from "@/components/svgs/TailwindCssSvg";
import TypeScriptSvg from "@/components/svgs/TypeScriptSvg";
import VercelSvg from "@/components/svgs/VercelSvg";
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
        svg: TypeScriptSvg,
      },
      {
        title: "JavaScript",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript",
        svg: JavaScriptSvg,
      },
      {
        title: "ECMAScript",
        url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/",
        svg: EcmaScriptSvg,
      },
      {
        title: "HTML5",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/HTML",
        svg: HtmlSvg,
      },
      {
        title: "CSS3",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS",
        svg: CssSvg,
      },
      {
        title: "React",
        url: "https://reactjs.org/",
        svg: ReactSvg,
      },
      {
        title: "Next.js",
        url: "https://nextjs.org/",
        svg: NextJsSvg,
      },
      {
        title: "Tailwind CSS",
        url: "https://tailwindcss.com/",
        svg: TailwindCssSvg,
      },
    ],
  },

  {
    label: "後端",
    list: [
      {
        title: "Node.js",
        url: "https://nodejs.org/",
        svg: NodeJsSvg,
      },
      {
        title: "Express.js",
        url: "https://expressjs.com/",
        svg: ExpressJsSvg,
      },
      {
        title: "Python",
        url: "https://www.python.org/",
        svg: PythonSvg,
      },
      {
        title: "Flask",
        url: "https://flask.palletsprojects.com/",
        svg: FlaskSvg,
      },
    ],
  },
  {
    label: "資料庫",
    list: [
      {
        title: "PostgreSQL",
        url: "https://www.postgresql.org/",
        svg: PostgreSqlSvg,
      },
    ],
  },

  {
    label: "開發工具",
    list: [
      {
        title: "Git",
        url: "https://git-scm.com/",
        svg: GitSvg,
      },
      {
        title: "GitHub",
        url: "https://github.com/",
        svg: GithubSvg,
      },
      {
        title: "ESLint",
        url: "https://eslint.org/",
        svg: EsLintSvg,
      },
      {
        title: "npm",
        url: "https://www.npmjs.com/",
        svg: NpmSvg,
      },
      {
        title: "Vercel",
        url: "https://vercel.com/",
        svg: VercelSvg,
      },
    ],
  },
];
