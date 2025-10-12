import {
  DatabaseOutlined,
  LayoutOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export const skills = {
  frontend: {
    icon: LayoutOutlined,
    list: [
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
        src: "https://api-frameworks.vercel.sh/framework-logos/next-dark.svg",
      },
      {
        title: "Ant Design",
        src: "https://www.svgrepo.com/show/353401/ant-design.svg",
      },
      {
        title: "Tailwind CSS",
        src: "https://www.svgrepo.com/show/354431/tailwindcss-icon.svg",
      },
    ],
  },
  backend: {
    icon: DatabaseOutlined,
    list: [
      { title: "Node.js", src: "https://www.svgrepo.com/show/452075/node-js.svg" },
      {
        title: "Python",
        src: "https://www.svgrepo.com/show/452091/python.svg",
      },
      // {
      //   title: "Flask",
      //   src: "https://flask.palletsprojects.com/en/stable/_static/shortcut-icon.png",
      // },
    ],
  },
  devtools: {
    icon: ToolOutlined,
    list: [
      {
        title: "Git",
        src: "https://www.svgrepo.com/show/452210/git.svg",
      },
      {
        title: "Visual Studio Code",
        src: "https://www.svgrepo.com/show/452129/vs-code.svg",
      },
      {
        title: "ESLint",
        src: "https://www.svgrepo.com/show/353709/eslint.svg",
      },
    ],
  },
} as const;
