import { PortfolioItem } from "@/types/portfolio";

export const portfolioTags = [
  "Python",
  "Next.js",
  "React",
  "CSS",
  "Frontend",
  "Express",
  "Node.js",
  "Google Sheets",
  "Backend",
  "Full Stack",
  "TypeScript",
  "Git / GitHub",
  "NPM",
  "Crawler",
  "Flask",
  "Line Bot SDK",
  "Matplotlib",
  "Requests"
] as const

export const portfolio: PortfolioItem[] = [
  {
    title: {
      chinese: "啦八機",
      english: "LaBaG",
    },
    imageSrc: "/Portfolio/labag.jpg",

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
        category: "package",
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
      "Node.js",
      "Google Sheets",
      "Backend",
      "Full Stack",
      "TypeScript",
      "Git / GitHub",
      "NPM",
    ],
  },
  {
    title: {
      chinese: "Meta 資訊處理工具",
      english: "Tools For Meta Information",
    },
    imageSrc: "/Portfolio/toolsformetainformation.jpg",

    links: [
      {
        category: "demo",
        href: "https://meta-infomation-tools.vercel.app",
      },
      {
        category: "github",
        href: "https://github.com/fanyuuu2006/Tools-For-Meta-Infomation",
      },
    ],
    time: "2025-03",
    about: {
      chinese:
        "一個專為整理 Meta 帳號管理中心提供之可下載資料而設計的工具網站。",
      english:
        "A web tool designed to organize and process downloadable data from the Meta Accounts Center.",
    },
    description: {
      chinese: [
        "前端使用 Next.js 和 React 開發，提供流暢且直覺的使用者體驗。",
        "採用 TypeScript 強化程式碼可讀性與維護性，提升開發品質。",
        "純前端運作，無需後端支援，所有資料僅在本地端處理，不會傳送或儲存任何使用者資訊，保障隱私安全。",
        "專案部署於 Vercel，確保網站快速穩定地運行。",
      ],
      english: [
        "Frontend developed with Next.js and React, offering a smooth and intuitive user experience.",
        "TypeScript was used to improve code readability, maintainability, and overall code quality.",
        "Operates entirely on the frontend without any backend services; all data is processed locally to ensure user privacy and security.",
        "Deployed on Vercel for fast and reliable web hosting.",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "CSS",
      "Frontend",
      "TypeScript",
      "Git / GitHub",
    ],
  },
  {
    title: {
      chinese: "玩股票都不揪",
      english: "Do Bu Jio",
    },
    imageSrc: "/Portfolio/dobujio.jpg",

    links: [
      {
        category: "demo",
        href: "https://line.me/R/ti/p/@458roass",
      },
      {
        category: "github",
        href: "https://github.com/fanyuuu2006/NTUST-1132-Software-Programming-Final-Project",
      },
    ],
    time: "2025-04",
    about: {
      chinese: "一款結合爬蟲與資料視覺化的指令式股票查詢 Line 機器人。",
      english:
        "A command-based Line bot for stock information queries, integrating web scraping and data visualization.",
    },
    description: {
      chinese: [
        "以 Python 開發，串接 Line Messaging API ，提供即時股票資訊查詢功能。",
        "利用 Requests 爬取台灣證交所公開資料。",
        "使用 Matplotlib 動態生成視覺化圖表。",
        "後端以 Flask 架設，並部署於 Vercel，處理 Line webhook 請求與回應。",
      ],
      english: [
        "Developed with Python and integrated with the LINE Messaging API to provide real-time stock information query functionality.",
        "Scraped public data from the Taiwan Stock Exchange using the Requests library.",
        "Generated dynamic visualizations with Matplotlib.",
        "Backend built with Flask and deployed on Vercel to handle Line webhook requests and responses.",
      ],
    },
    tags: [
      "Python",
      "Backend",
      "Requests",
      "Crawler",
      "Flask",
      "Line Bot SDK",
      "Matplotlib",
      "Git / GitHub",
    ],
  },
  {
    imageSrc: "/Portfolio/aojiao.jpg",
    title: {
      chinese: "小傲驕",
      english: "Aojiao",
    },
    links: [
      {
        category: "demo",
        href: "https://line.me/R/ti/p/@819olsro",
      },
      {
        category: "github",
        href: "https://github.com/fanyuuu2006/NTUST-BoardGameClub-Bot",
      },
    ],
    time: "2025-04",
    about: {
      chinese:
        "臺科大桌遊社專屬的 Line Bot，協助幹部管理社務並提升社員互動體驗。",
      english:
        "A custom Line Bot for NTUST Board Game Club, assist club management and boost member engagement.",
    },
    description: {
      chinese: [
        "使用 Express 架設伺服器，處理 Line webhook 請求。",
        "使用 Google Sheets 作為資料儲存與查詢後端。",
        "部署於 Vercel，快速穩定地提供服務。",
      ],
      english: [
        "Built with Express to handle Line webhook requests.",
        "Integrated with Google Sheets for data storage and retrieval.",
        "Deployed on Vercel for fast and reliable performance.",
      ],
    },
    tags: [
      "Express",
      "Node.js",
      "Backend",
      "Line Bot SDK",
      "Google Sheets",
      "Git / GitHub",
    ],
  },
];
