# FanYu — 個人作品集網站

[Next.js](https://nextjs.org/)
[React](https://react.dev/)
[TypeScript](https://www.typescriptlang.org/)
[Tailwind CSS](https://tailwindcss.com/)
[Deployed on Vercel](https://fanyu.vercel.app)

> 飯魚（范余振富）的個人網站 — 展示自我介紹、技能、作品集、學經歷與聯絡方式。

🔗 **線上預覽：** [https://fanyu.vercel.app](https://fanyu.vercel.app)

---

## Overview

**FanYu** 是一個以 Next.js App Router 建構的現代化個人作品集網站。網站整合首頁單頁導覽、獨立作品集頁面、GitHub README 即時渲染，以及基於 Giscus 的留言互動功能，作為開發者對外展示技術能力與專案成果的入口。

### 解決的問題

- 將個人資訊、技能、專案與經歷集中於單一平台，取代分散在多個 GitHub README 與社群連結的呈現方式
- 提供可搜尋、可篩選的作品集瀏覽體驗，方便訪客快速找到感興趣的專案
- 透過 SEO 結構化資料、sitemap 與分析工具，提升個人品牌的可見度與可追蹤性

### 適合誰使用

- 前端 / 全端開發者，需要建立個人品牌與作品集網站
- 學生開發者，希望以現代化技術棧展示 side project
- 對 Next.js App Router、Tailwind CSS 4、Giscus 整合有興趣的開發者，作為參考專案

---

## Features

- **首頁單頁導覽** — Hero、關於我、技能專長、精選作品、學經歷（學歷 / 工作 / 社團 / 競賽）與聯絡方式等區塊
- **作品集列表與篩選** — 支援關鍵字搜尋、多標籤分類篩選（語言、前端、後端、角色等）與排序
- **作品詳情頁** — 動態路由展示專案資訊，自動從 GitHub 拉取並渲染 README（支援 GFM、程式碼高亮）
- **Giscus 留言板** — 全站留言板與各作品獨立討論區，整合 GitHub Discussions
- **網站分析儀表板** — Footer 顯示 Google Analytics Data API 提供的訪客數與瀏覽量統計
- **SEO 與效能優化** — JSON-LD 結構化資料、sitemap、robots.txt、Open Graph、Vercel Analytics 與 Speed Insights
- **響應式導覽列** — 桌面版錨點導覽與行動版漢堡選單，Framer Motion 動畫增強互動體驗

---

## Tech Stack

| 類別           | 技術                                                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **前端框架**     | [Next.js 16](https://nextjs.org/)（App Router）、[React 19](https://react.dev/)                                                                                                                                       |
| **語言**       | [TypeScript 5](https://www.typescriptlang.org/)                                                                                                                                                                    |
| **UI / CSS** | [Tailwind CSS 4](https://tailwindcss.com/)、[Framer Motion](https://www.framer.com/motion/)、[Ant Design Icons](https://ant.design/components/icon)、[fanyucomponents](https://www.npmjs.com/package/fanyucomponents) |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown)、remark-gfm、rehype-raw、[c063](https://www.npmjs.com/package/c063)（語法高亮）                                                                                |
| **API / 資料** | Next.js Route Handlers、[@google-analytics/data](https://www.npmjs.com/package/@google-analytics/data)、GitHub Raw API                                                                                               |
| **互動 / 分析**  | [@giscus/react](https://giscus.app/)、[@vercel/analytics](https://vercel.com/docs/analytics)、[@vercel/speed-insights](https://vercel.com/docs/speed-insights)                                                       |
| **部署**       | [Vercel](https://vercel.com/)                                                                                                                                                                                      |

---

## Project Structure

```
.
├── public/
│   └── images/              # 靜態資源（頭像、技能圖示、favicon）
├── src/
│   ├── app/                 # Next.js App Router 路由
│   │   ├── api/v1/analytics/  # GA Data API 統計端點
│   │   ├── guestbook/         # 留言板頁面
│   │   ├── portfolio/         # 作品集列表與 [title] 詳情頁
│   │   ├── layout.tsx           # 根布局（Header、Footer、SEO、Analytics）
│   │   ├── page.tsx             # 首頁
│   │   ├── metadata.tsx         # 全站 Metadata 設定
│   │   ├── sitemap.ts           # 動態 sitemap 生成
│   │   └── robots.ts            # robots.txt
│   ├── components/          # React 元件
│   │   ├── index/             # 首頁各區塊（Hero、About、Skills 等）
│   │   ├── portfolio/         # 作品集列表、篩選、卡片、詳情頁元件
│   │   ├── guestbook/           # Giscus 留言板元件
│   │   └── Header/              # 導覽列（桌面 / 行動版）
│   ├── hooks/               # 自訂 Hooks（如作品集 URL 參數）
│   ├── libs/                # 靜態資料與設定（portfolio、skills、routes、site）
│   ├── styles/              # 全域 CSS 與模組化樣式
│   ├── types/               # TypeScript 型別定義
│   └── utils/               # 工具函式（GitHub API、URL、className）
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

### 重要目錄說明

| 目錄                | 用途                                    |
| ----------------- | ------------------------------------- |
| `src/app/`        | App Router 頁面路由、API Routes 與 SEO 相關設定 |
| `src/components/` | 可重用 UI 元件，依功能分為首頁、作品集、Header 等子目錄     |
| `src/libs/`       | 作品集、技能、學經歷、聯絡方式等靜態資料來源                |
| `src/utils/`      | GitHub README 抓取、Badge 生成、URL 工具等     |
| `public/images/`  | 不需經 bundler 處理的靜態圖片資源                 |

---

## Getting Started

### 前置需求

- [Node.js](https://nodejs.org/) 18.18 或以上
- npm（或相容的套件管理器）

### 安裝與啟動

```bash
# 克隆專案
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu

# 安裝依賴
npm install

# 設定環境變數（見下方章節，手動建立 .env.local）

# 啟動開發伺服器
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可預覽。

### 其他指令

```bash
# 建置正式版
npm run build

# 啟動正式版伺服器（需先 build）
npm run start

# ESLint 檢查
npm run lint
```

---

## Environment Variables

在專案根目錄建立 `.env.local`，並填入以下變數。這些設定用於 `/api/v1/analytics` 端點，透過 Google Analytics Data API 取得網站統計資料。

```env
# Google Analytics 4 Property ID（純數字，不含 "properties/" 前綴）
GA_PROPERTY_ID=123456789

# Google Cloud Service Account 憑證（需具備 GA4 讀取權限）
GA_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Service Account 私鑰（部署時以 \n 表示換行）
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> **注意：** 若未設定上述變數，網站仍可正常運作，但 Footer 的訪客統計將無法顯示。Giscus 留言板使用公開的 repo 設定，無需額外環境變數。

---

## Deployment

### Vercel（推薦）

1. 將 repository 連結至 [Vercel](https://vercel.com/)
2. 在 Project Settings → Environment Variables 中設定 `GA_PROPERTY_ID`、`GA_CLIENT_EMAIL`、`GA_PRIVATE_KEY`
3. 部署完成後，Vercel 會自動執行 `npm run build` 並提供 CDN 加速

### 其他平台

| 平台           | 說明                                                                                  |
| ------------ | ----------------------------------------------------------------------------------- |
| **Docker**   | 可建立 multi-stage Dockerfile，以 `npm run build && npm run start` 啟動，預設監聽 `3000` port   |
| **VPS / 自架** | 需 Node.js 18+ 環境，執行 `npm run build` 後以 `npm run start` 或 PM2 等 process manager 維持服務 |
| **靜態匯出**     | 本專案含 API Routes 與 Server Components 動態抓取，不建議使用 `output: 'export'`                   |

---

## License

本專案採 **MIT License** 授權。

---

Made with ❤️ by [FanYu](https://github.com/fanyuuu2006)
