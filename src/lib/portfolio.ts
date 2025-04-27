import { PortfolioItem } from "@/types/portfolio";

export const portfolio: PortfolioItem[] = [
  {
    imageSrc: "/Portfolio/labag.jpg",
    title: {
      chinese: "啦八機",
      english: "LaBaG",
    },
    links: [
      {
        category: "demo",
        href: "https://labag.vercel.app",
      },
      {
        category: "demo",
        href: "https://labag-backend.vercel.app",
      },
      {
        category: "demo",
        href: "https://www.npmjs.com/package/labag",
      },
      {
        category: "github",
        href: "https://github.com/fanyuuu2006/LaBaG-Web",
      },
      {
        category: "github",
        href: "https://github.com/fanyuuu2006/LaBaG-TypeScript",
      },
    ],
    time: "2023-06",
    about: {
      chinese: "一款網頁拉霸機遊戲。",
      english: "A web-based slot machine game.",
    },
    description: {
      chinese: [
        "前端使用 Next.js 和 React 開發，實現遊戲介面與動態效果。",
        "後端使用 Express 提供 API 支援，負責與前端進行資料交互，並處理遊戲所需的資料管理。",
        "遊戲邏輯被封裝為 npm 包，供前端與後端共享，簡化了開發與維護過程。",
        "使用 TypeScript 提高程式碼的穩定性與可維護性，增進開發效率。",
        "資料存儲方面，使用 Google Sheets 作為簡易的資料庫來管理遊戲數據。",
        "專案前後端皆部署於 Vercel，實現了快速的部署和持續的擴展。",
      ],
      english: [
        "Frontend developed with Next.js and React to create an interactive game interface with dynamic animations.",
        "Backend built with Express to provide API support, handling data exchange between frontend and backend, and managing game-related data.",
        "The game logic is encapsulated in an npm package for shared usage between frontend and backend, simplifying development and maintenance.",
        "TypeScript was employed to improve code stability and maintainability, enhancing the overall development process.",
        "For data storage, Google Sheets was used as a simple database solution to manage game data.",
        "The project is deployed on Vercel for both frontend and backend, enabling fast deployments and easy scalability.",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "CSS",
      "Frontend",
      "Express",
      "Google Sheet",
      "Backend",
      "Fullstack",
      "TypeScript",
      "Git",
      "Github",
    ],
  },
];
