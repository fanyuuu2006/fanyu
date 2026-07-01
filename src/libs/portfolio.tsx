import { PortfolioItem } from "@/types";
import { site } from "./site";

export const tagCategories = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "CSS"],

  frontend: ["React", "Next.js"],

  backend: ["Node.js", "Express.js", "Flask", "Restful API"],

  database: ["Supabase"],

  automation: ["Crawler", "Requests"],

  visualization: ["Matplotlib"],

  platforms: ["Line Bot SDK"],

  tools: ["Git / GitHub", "NPM", "Vercel"],

  roles: ["Frontend", "Backend", "Full Stack", "Database"],

  other: [],
} as const;

export const portfolioItems: PortfolioItem[] = [
  {
    title: "啦八機",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/labag-web-v2/refs/heads/main/public/icons/icon-512x512.png",
    date: "2023-06-22",
    overview: "一款網頁拉霸機遊戲。",
    links: [
      {
        label: "網站連結",
        url: "https://labag.vercel.app",
      },
    ],
    github: {
      repo: "fanyuuu2006/labag-web-v2",
      giscus: {
        repoId: "R_kgDOQt2e2w",
        categoryId: "DIC_kwDOQt2e284C_o62",
      },
    },
    tags: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Express.js",
      "Node.js",
      "Frontend",
      "Backend",
      "Full Stack",
      "SQL",
      "Database",
      "Supabase",
      "Restful API",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: "Meta 資訊處理工具",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/Tools-For-Meta-Infomation/refs/heads/main/frontend/public/Logo.webp",
    date: "2025-03",
    overview: "一個專為整理 Meta 帳號管理中心提供之可下載資料的工具網站。",
    links: [
      {
        label: "網站連結",
        url: "https://meta-infomation-tools.vercel.app",
      },
    ],
    github: {
      repo: "fanyuuu2006/Tools-For-Meta-Infomation",
      giscus: {
        repoId: "R_kgDOOCOC7w",
        categoryId: "DIC_kwDOOCOC784Cqc9L",
      },
    },
    tags: [
      "TypeScript",
      "Next.js",
      "React",
      "CSS",
      "Frontend",
      "JavaScript",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: "玩股票都不揪",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/NTUST-1132-Software-Programming-Final-Project/refs/heads/main/assets/favicon.jpg",
    date: "2025-04",
    overview: "一款結指令式股票查詢 Line 機器人。",
    links: [
      {
        label: "添加Line好友",
        url: "https://line.me/R/ti/p/@458roass",
      },
    ],
    github: {
      repo: "fanyuuu2006/NTUST-1132-Software-Programming-Final-Project",
      giscus: {
        repoId: "R_kgDOOWe7lg",
        categoryId: "DIC_kwDOOWe7ls4CqjrG",
      },
    },
    tags: [
      "Python",
      "Flask",
      "Backend",
      "Requests",
      "Crawler",
      "Line Bot SDK",
      "Matplotlib",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: "小傲驕",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/NTUST-BoardGameClub-Bot/refs/heads/main/public/image/icon.jpg",
    date: "2025-03",
    overview: "臺科大桌遊社專屬的 Line Bot",
    links: [
      {
        label: "添加Line好友",
        url: "https://line.me/R/ti/p/@819olsro",
      },
    ],
    github: {
      repo: "fanyuuu2006/NTUST-BoardGameClub-Bot",
      giscus: {
        repoId: "R_kgDOOH0UhA",
        categoryId: "DIC_kwDOOH0UhM4CrXTj",
      },
    },
    tags: [
      "TypeScript",
      "Express.js",
      "JavaScript",
      "Node.js",
      "Backend",
      "Restful API",
      "Line Bot SDK",
      "Vercel",
      "Git / GitHub",
    ],
  },
  {
    title: "飯魚的組件",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/fanyu-components/main/public/icon.png",
    date: "2025-04",
    overview: "一款以純邏輯為核心、無樣式綁定的 React 組件套件。",
    links: [
      {
        label: "npm 連結",
        url: "https://www.npmjs.com/package/fanyucomponents",
      },
    ],
    github: {
      repo: "fanyuuu2006/fanyu-components",
      giscus: {
        repoId: "R_kgDOOWqWZA",
        categoryId: "DIC_kwDOOWqWZM4Cqjq0",
      },
    },
    tags: [
      "TypeScript",
      "React",
      "Frontend",
      "NPM",
      "JavaScript",
      "Git / GitHub",
    ],
  },
  {
    title: "c063",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/c063/refs/heads/main/public/icon.png",
    date: "2025-06",
    overview: "一款用於顯示語法高亮代碼片段的 React 組件庫。",
    links: [
      {
        label: "npm 連結",
        url: "https://www.npmjs.com/package/c063",
      },
    ],
    github: {
      repo: "fanyuuu2006/c063",
      giscus: {
        repoId: "R_kgDOO8lIlQ",
        categoryId: "DIC_kwDOO8lIlc4Crtvu",
      },
    },
    tags: [
      "TypeScript",
      "React",
      "Frontend",
      "NPM",
      "JavaScript",
      "Git / GitHub",
    ],
  },
  {
    title: "博斯車體美研預約系統",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/bscar/refs/heads/main/public/images/icons/logo.jpg",
    date: "2026-02-16",
    overview: "一個為博斯車體美研製作之提供汽車美容服務預約的網站。",
    links: [
      {
        label: "網站連結",
        url: "https://bscar.vercel.app/booking",
      },
    ],
    github: {
      repo: "fanyuuu2006/bscar",
      giscus: {
        repoId: "R_kgDOQ1VEkw",
        categoryId: "DIC_kwDOQ1VEk84C_pBJ",
      },
    },
    tags: [
      "TypeScript",
      "Next.js",
      "React",
      "CSS",
      "SQL",
      "Frontend",
      "Express.js",
      "Node.js",
      "Database",
      "Backend",
      "Full Stack",
      "Restful API",
      "Supabase",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: "FuturixDev 官網",
    imageUrl: "https://avatars.githubusercontent.com/u/221304771",
    date: "2025-08",
    overview: "FuturixDev 團隊官方網站，展示團隊理念、服務內容與開發成果。",
    links: [
      {
        label: "網站連結",
        url: "https://futurixdev.github.io/official-web/",
      },
    ],
    github: {
      repo: "FuturixDev/official-web",
    },
    tags: [
      "TypeScript",
      "Next.js",
      "React",
      "CSS",
      "Frontend",
      "JavaScript",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: site.title,
    imageUrl: "/images/fanyu.jpg",
    date: "2025-04",
    overview: site.description,
    links: [
      {
        label: "網站連結",
        url: site.url,
      },
    ],
    github: {
      repo: "fanyuuu2006/fanyu",
      giscus: {
        repoId: "R_kgDOOeftZg",
        categoryId: "DIC_kwDOOeftZs4CqXwr",
      },
    },
    tags: [
      "TypeScript",
      "Next.js",
      "React",
      "JavaScript",
      "Frontend",
      "Git / GitHub",
      "Vercel",
      "CSS",
    ],
  },
];
