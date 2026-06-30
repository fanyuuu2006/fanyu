import AntDesignSvg from "@/components/index/svgs/AntDesign";
import CssSvg from "@/components/index/svgs/CssSvg";
import CursorSvg from "@/components/index/svgs/CursorSvg";
import EcmaScriptSvg from "@/components/index/svgs/EcmaScriptSvg";
import EsLintSvg from "@/components/index/svgs/EsLintSvg";
import ExpressJsSvg from "@/components/index/svgs/ExpressJsSvg";
import FlaskSvg from "@/components/index/svgs/FlaskSvg";
import GithubSvg from "@/components/index/svgs/GithubSvg";
import GitSvg from "@/components/index/svgs/GitSvg";
import HtmlSvg from "@/components/index/svgs/HtmlSvg";
import JavaScriptSvg from "@/components/index/svgs/JavaScriptSvg";
import MarkdownSvg from "@/components/index/svgs/MarkdownSvg";
import NextJsSvg from "@/components/index/svgs/NextJsSvg";
import NodeJsSvg from "@/components/index/svgs/NodeJsSvg";
import NpmSvg from "@/components/index/svgs/NpmSvg";
import PostgreSqlSvg from "@/components/index/svgs/PostgreSqlSvg";
import PythonSvg from "@/components/index/svgs/PythonSvg";
import ReactSvg from "@/components/index/svgs/ReactSvg";
import SupabaseSvg from "@/components/index/svgs/SupabaseSvg";
import TailwindCssSvg from "@/components/index/svgs/TailwindCssSvg";
import TypeScriptSvg from "@/components/index/svgs/TypeScriptSvg";
import VercelSvg from "@/components/index/svgs/VercelSvg";
import VisualStudioCodeSvg from "@/components/index/svgs/VisualStudioCodeSvg";
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
        title: "EcmaScript",
        url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/",
        svg: EcmaScriptSvg,
      },
      {
        title: "HTML",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/HTML",
        svg: HtmlSvg,
      },
      {
        title: "CSS",
        url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS",
        svg: CssSvg,
      },
      {
        title: "Markdown",
        url: "https://www.markdownguide.org/",
        svg: MarkdownSvg,
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
        title: "Ant Design",
        url: "https://ant.design/",
        svg: AntDesignSvg,
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
        title: "Github",
        url: "https://github.com/",
        svg: GithubSvg,
      },
      {
        title: "Visual Studio Code",
        url: "https://code.visualstudio.com/",
        svg: VisualStudioCodeSvg,
      },
      {
        title: "Cursor",
        url: "https://cursor.sh/",
        svg: CursorSvg,
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
      {
        title: "Supabase",
        url: "https://supabase.com/",
        svg: SupabaseSvg,
      },
    ],
  },
];
