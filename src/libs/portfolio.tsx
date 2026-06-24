import { PortfolioItem } from "@/types";

export const tagCategories = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "CSS"],

  frontend: ["React", "Next.js"],

  backend: ["Node.js", "Express", "Flask", "Restful API"],

  database: ["Google Sheets", "Supabase", "SQL"],

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
      "https://raw.githubusercontent.com/fanyuuu2006/LaBaG-Web/refs/heads/main/frontend/src/assets/SuperCircle.png",
    date: "2023-06-22",
    points: [
      "前端使用 Next.js 和 React 開發，實現遊戲介面與動態效果。",
      "後端使用 Express 提供 API 支援，負責與前端進行資料交互，並處理遊戲所需的資料管理。",
      "遊戲邏輯被封裝為 npm 包，供前端與後端共享，簡化了開發與維護過程。",
      "使用 TypeScript 提高程式碼的穩定性與可維護性，增進開發效率。",
      "資料存儲方面，使用 Supabase 作為簡易的資料庫來管理遊戲數據。",
      "專案前後端皆部署於 Vercel，實現了快速的部署和持續的擴展。",
    ],
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
      "Express",
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
    points: [
      "前端使用 Next.js 和 React 開發，提供流暢且直覺的使用者體驗。",
      "採用 TypeScript 強化程式碼可讀性與維護性，提升開發品質。",
      "純前端運作，無需後端支援，所有資料僅在本地端處理，不會傳送或儲存任何使用者資訊，保障隱私安全。",
      "專案部署於 Vercel，確保網站快速穩定地運行。",
    ],
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
    points: [
      "以 Python 開發，串接 Line Messaging API ，提供即時股票資訊查詢功能。",
      "利用 Requests 爬取台灣證交所公開資料。",
      "使用 Matplotlib 動態生成視覺化圖表。",
      "後端以 Flask 架設，並部署於 Vercel，處理 Line webhook 請求與回應。",
    ],
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
    points: [
      "使用 Express 架設伺服器，處理 Line webhook 請求。",
      "使用 Google Sheets 作為資料儲存與查詢後端。",
      "部署於 Vercel，快速穩定地提供服務。",
    ],
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
      "Express",
      "JavaScript",
      "Node.js",
      "Backend",
      "Restful API",
      "Line Bot SDK",
      "Google Sheets",
      "Vercel",
      "Git / GitHub",
    ],
  },
  {
    title: "飯魚的組件",
    imageUrl:
      "https://raw.githubusercontent.com/fanyuuu2006/fanyu-components/main/public/icon.png",
    date: "2025-04",
    points: [
      "使用 React 開發，專注於封裝純邏輯互動元件，無綁定樣式，適用於多樣化 UI 設計。",
      "完整支援 TypeScript，提供嚴謹的型別定義與 IntelliSense 輔助，提高開發效率與穩定性。",
      "支援 `as` props，強化組件彈性與可組合性。",
      "套件本體極為輕量，未引入額外 UI 函式庫，適合需要高度客製化的應用場景。",
      "已發布於 npm，便於前端專案快速整合與重複使用。",
    ],
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
    points: [
      "使用 React 和 TypeScript 開發，提供強大的語法高亮功能與高度模組化設計，適用於教學、文件與部落格等場景。",
      "支援多種主題風格（如 GitHub、VS Code 等），可自由切換深淺色模式，提升可讀性。",
      "組件具備可擴充性，提供 `as` 屬性支援自定義渲染方式。",
      "公開於 npm，可快速安裝並於各式前端專案中整合使用。",
      "提供 `token` 工具函式協助開發者快速建立語法元素，提升開發效率。",
    ],
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
    points: [
      "前端使用 Next.js 和 React 開發，提供用戶友好的預約界面和流暢的互動體驗。",
      "後端使用 Express 提供 API 支援，負責處理預約資料和用戶管理。",
      "使用 TypeScript 提高程式碼的穩定性與可維護性，增進開發效率。",
      "資料存儲方面，使用 Supabase 作為後端資料庫，提供可靠的資料管理和查詢功能。",
      "專案前後端皆部署於 Vercel，實現了快速的部署和持續的擴展。",
    ],
    overview: "一個為博斯車體美研製作之提供汽車美容服務預約的網站。",
    links: [
      {
        label: "網站連結",
        url: "https://bscar.vercel.app",
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
      "Express",
      "Node.js",
      "Database",
      "Backend",
      "Restful API",
      "Supabase",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: "FuturixDev 官網",
    imageUrl:
      "https://raw.githubusercontent.com/FuturixDev/official-web/refs/heads/main/public/favicon.ico",
    date: "2025-08",
    points: [
      "使用 Next.js 15 與 React 開發，採用 App Router 架構建置現代化企業形象網站。",
      "全站以 TypeScript 撰寫，提升程式碼可維護性與開發效率。",
      "採用 Tailwind CSS 建立響應式介面，支援桌面與行動裝置瀏覽。",
      "整合 Framer Motion 製作動畫效果，提升網站互動體驗與視覺呈現。",
      "使用 SWR 進行資料獲取與狀態管理，提高資料更新效率。",
      "導入 SEO 優化與 Sitemap 產生機制，提升網站搜尋引擎能見度。",
      "部署於 GitHub Pages，透過 GitHub Actions 自動化建置與部署流程。",
    ],
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
];
