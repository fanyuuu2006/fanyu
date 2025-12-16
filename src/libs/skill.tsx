import {
  DatabaseOutlined,
  LayoutOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export const skills: Record<
  string,
  {
    icon: React.ElementType;
    list: {
      title: string;
      srcArray: string[];
      src: string;
    }[];
  }
> = {
  frontend: {
    icon: LayoutOutlined,
    list: [
      {
        title: "TypeScript",
        srcArray: [
          "https://www.svgrepo.com/show/349540/typescript.svg",
          "https://www.svgrepo.com/show/354478/typescript-icon.svg",
        ],
        src: "https://www.svgrepo.com/show/374146/typescript-official.svg",
      },
      {
        title: "JavaScript",
        srcArray: [],
        src: "https://www.svgrepo.com/show/373705/js-official.svg",
      },

      {
        title: "HTML 5",
        srcArray: [],
        src: "https://www.svgrepo.com/show/373669/html.svg",
      },
      {
        title: "CSS 3",
        srcArray: [],
        src: "https://www.svgrepo.com/show/373535/css.svg",
      },
      {
        title: "React",
        srcArray: [],
        src: "https://www.svgrepo.com/show/354259/react.svg",
      },
      {
        title: "Next.js",
        srcArray: [],
        src: "https://api-frameworks.vercel.sh/framework-logos/next-dark.svg",
      },
      {
        title: "Ant Design",
        srcArray: [],
        src: "https://www.svgrepo.com/show/353401/ant-design.svg",
      },
      {
        title: "Tailwind CSS",
        srcArray: [],
        src: "https://www.svgrepo.com/show/354431/tailwindcss-icon.svg",
      },
    ],
  },
  backend: {
    icon: DatabaseOutlined,
    list: [
      {
        title: "Node.js",
        srcArray: [],
        src: "https://www.svgrepo.com/show/452075/node-js.svg",
      },
      {
        title: "Python",
        srcArray: [],
        src: "https://www.svgrepo.com/show/452091/python.svg",
      },
    ],
  },
  devtools: {
    icon: ToolOutlined,
    list: [
      {
        title: "Git",
        srcArray: [],
        src: "https://www.svgrepo.com/show/452210/git.svg",
      },
      {
        title: "Visual Studio Code",
        srcArray: [],
        src: "https://www.svgrepo.com/show/452129/vs-code.svg",
      },
      {
        title: "ESLint",
        srcArray: [],
        src: "https://www.svgrepo.com/show/353709/eslint.svg",
      },
    ],
  },
};
