# 🧑‍💻FanYu 個人網站（Portfolio Website）

由 FanYu（范余振富） 開發的個人作品展示平台，基於 Next.js + TypeScript，整合多語言切換、Google Drive 相簿 API、動態篩選作品集、動畫效果、SEO 優化、留言板、生日倒計時等功能，是一個全方位的現代化個人網站。

## 🔗 快速前往

👉 [https://fanyu.vercel.app](https://fanyu.vercel.app)

## 📌 功能特色

### 🏠 首頁功能

- 🚀 Hero 區塊：個人介紹與社群連結，包含動態打字效果
- 🙋 關於我：多段自我敘述
- 🛠 技能展示：依分類呈現技能圖示（前端、後端、開發工具）
- 🎨 作品集區塊：隨機精選與多條件篩選
- 🧭 經歷切換區塊（教育 / 社團 / 工作 / 競賽）
- 📞 聯絡方式整理（社群 / 即時通訊）

### 📚 專頁功能

- 🖼 **相簿系統**：Google Drive 相簿整合（年份 / 活動 / 圖片）
  - 動態路由：`/album/[year]/[eventName]`
  - 圖片懶載入與模態框預覽
  - 響應式網格佈局
  - 自動生成 sitemap 與 SEO 優化
- 📝 **留言板**：整合 Giscus 評論系統
  - 基於 GitHub Discussions
  - 支援中英文切換
  - 即時更新，無需資料庫
- 🎯 **作品集專頁**：完整作品展示與篩選
  - 多標籤篩選系統
  - 時間排序（最新/最舊）
  - 動態計數顯示
  - 響應式卡片佈局
  - 整合 GitHub 討論區
- ⏰ **個人頁面**：生日倒計時器
  - 即時倒計時顯示
  - 響應式設計
  - 多語言支援

### 🌐 系統功能

- 🌐 支援中英文語言切換（Context API 管理）
- 🎞 豐富動畫效果（Framer Motion 驅動）
- 📱 完全響應式設計（支援各種裝置）
- 🔍 全面 SEO 優化（結構化資料、動態 sitemap、robots.txt）
- 📊 多重網站分析（Google Analytics、Vercel Analytics、Speed Insights）
- 🚀 現代化開發體驗（TypeScript、ESLint、Turbopack）
- 🎨 自訂 UI 元件系統（fanyucomponents）
- 🌟 自開發程式碼高亮元件（c063）

## 🧰 技術架構

| 分類         | 技術堆疊                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 框架         | [Next.js (App Router)](https://nextjs.org/) + [Turbopack](https://nextjs.org/docs/app/api-reference/next-config-js/turbopack) |
| 語言         | [TypeScript](https://www.typescriptlang.org/)                                                                                   |
| UI 函式庫    | [React](https://react.dev/)                                                                                                     |
| 樣式         | [Tailwind CSS](https://tailwindcss.com/) + [styled-components](https://styled-components.com/) + 自訂 CSS 變數                |
| 動畫         | [framer-motion](https://www.framer.com/motion/)                                                                                 |
| 圖片處理     | Google Drive API + 自建 Image Proxy + Next.js Image 優化                                                                        |
| 圖示         | [Ant Design Icons](https://ant.design/components/icon/) + [react-icons](https://react-icons.github.io/react-icons/)           |
| UI 元件      | `fanyucomponents`（自訂元件庫）+ [Ant Design](https://ant.design/)                                                              |
| 通知系統     | [sweetalert2](https://sweetalert2.github.io/)（Toast 通知）                                                                     |
| 評論系統     | [Giscus](https://giscus.app/)（GitHub Discussions 整合）                                                                        |
| 資料獲取     | [SWR](https://swr.vercel.app/) + Next.js API Routes                                                                             |
| 圖片載入優化 | 自訂 `LazyImage` 元件 + Intersection Observer                                                                                   |
| 程式碼高亮   | [c063](https://www.npmjs.com/package/c063)（自開發語法高亮元件）                                                                |
| 網站地圖     | [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)                                                                 |
| HTTP 客戶端  | [gaxios](https://github.com/googleapis/gaxios) + [googleapis](https://github.com/googleapis/google-api-nodejs-client)       |
| 網站分析     | [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights)               |
| 部署平台     | [Vercel](https://vercel.com/)                                                                                                   |

## 🗂 專案結構

```plaintext
├── public/                  # 靜態資源
│   ├── cbg.jpg             # 背景圖片
│   ├── GameShow.jpg        # 遊戲展示圖片
│   ├── logo.png            # 網站 Logo
│   ├── favicon.ico         # 網站圖示
│   └── robots.txt          # 搜尋引擎爬蟲設定
├── src/
│   ├── app/                # Next.js App Router 路由系統
│   │   ├── album/          # 相簿系統動態路由
│   │   │   ├── [year]/     # 年份動態路由
│   │   │   │   ├── page.tsx # 年份頁面
│   │   │   │   └── [eventName]/ # 活動動態路由
│   │   │   │       ├── layout.tsx # 活動佈局
│   │   │   │       └── page.tsx   # 活動頁面
│   │   │   ├── layout.tsx  # 相簿佈局
│   │   │   └── page.tsx    # 相簿主頁
│   │   ├── api/            # API 路由
│   │   │   ├── album/      # 相簿 API
│   │   │   │   ├── route.ts # 相簿列表 API
│   │   │   │   └── [year]/ # 年份相簿 API
│   │   │   │       ├── route.ts # 年份 API
│   │   │   │       └── [eventName]/ # 活動相簿 API
│   │   │   │           ├── route.ts   # 活動 API
│   │   │   │           └── [index]/   # 圖片索引 API
│   │   │   │               └── route.ts
│   │   │   └── image/[fileId]/ # 圖片代理 API
│   │   │       └── route.ts
│   │   ├── guestbook/      # 留言板頁面
│   │   │   ├── layout.tsx  # 留言板佈局
│   │   │   └── page.tsx    # 留言板頁面
│   │   ├── my/             # 個人頁面（倒計時器）
│   │   │   └── page.tsx    # 個人頁面
│   │   ├── projects/       # 作品集專頁
│   │   │   ├── [title]/    # 專案詳情動態路由
│   │   │   │   └── page.tsx # 專案詳情頁面
│   │   │   ├── layout.tsx  # 作品集佈局
│   │   │   └── page.tsx    # 作品集主頁
│   │   ├── error.tsx       # 全域錯誤頁面
│   │   ├── layout.tsx      # 根佈局元件
│   │   ├── metadata.ts     # 網站元資料設定
│   │   ├── not-found.tsx   # 404 頁面
│   │   ├── page.tsx        # 首頁
│   │   └── sitemap.ts      # 動態 sitemap 生成
│   ├── components/         # React 元件
│   │   ├── album/          # 相簿相關元件
│   │   │   ├── [year]/     # 特定年份相簿元件
│   │   │   │   └── [eventName]/ # 特定活動相簿元件
│   │   │   │       ├── ImageCard.tsx   # 圖片卡片
│   │   │   │       └── MainSection.tsx # 活動主要區塊
│   │   │   ├── EventLinkCard.tsx # 活動連結卡片
│   │   │   ├── MainSection.tsx   # 相簿主要區塊
│   │   │   └── YearDiv.tsx       # 年份顯示元件
│   │   ├── custom/         # 自訂通用元件
│   │   │   ├── Carousel.tsx      # 輪播元件
│   │   │   ├── CodeCard.tsx      # 程式碼卡片
│   │   │   ├── CopyButton.tsx    # 複製按鈕
│   │   │   ├── CustomLink.tsx    # 自訂連結元件
│   │   │   ├── LazyImage.tsx     # 懶載入圖片元件
│   │   │   └── Toast.ts          # 通知系統
│   │   ├── guestbook/      # 留言板元件
│   │   │   └── MainSection.tsx   # 留言板主要區塊
│   │   ├── Header/         # 導航列相關元件
│   │   │   ├── BurgerMenu.tsx    # 漢堡選單
│   │   │   ├── Header.tsx        # 主導航列
│   │   │   └── routes.tsx        # 路由設定
│   │   ├── Index/          # 首頁各區塊元件
│   │   │   ├── AboutMeSection/   # 關於我區塊
│   │   │   ├── ContactSection/   # 聯絡資訊區塊
│   │   │   ├── ExperienceSection/ # 經歷區塊
│   │   │   ├── HeroSection/      # 英雄區塊
│   │   │   ├── PortfolioSection/ # 作品集區塊
│   │   │   └── SkillsSection/    # 技能區塊
│   │   ├── my/             # 個人頁面元件
│   │   │   ├── MainSection.tsx   # 個人頁面主區塊
│   │   │   └── TimerCard.tsx     # 倒計時卡片
│   │   ├── projects/       # 作品集元件
│   │   │   ├── MainSection.tsx     # 作品集主區塊
│   │   │   ├── ProjectCard.tsx     # 專案卡片
│   │   │   └── ProjectTagCheckbox.tsx # 專案標籤過濾
│   │   ├── Footer.tsx      # 網站頁尾
│   │   └── LanguageSwitchButton.tsx # 語言切換按鈕
│   ├── contexts/           # React Context 狀態管理
│   │   ├── AlbumContext.tsx      # 相簿狀態管理
│   │   └── LanguageContext.tsx   # 語言切換狀態
│   ├── hooks/              # 自訂 React Hooks
│   │   ├── useInViewUnderlineSpread.tsx # 視窗內動畫 Hook
│   │   └── useTimeOrderTabs.tsx         # 時間排序 Hook
│   ├── libs/               # 資料與工具函式
│   │   ├── education/      # 教育經歷資料
│   │   ├── club.tsx        # 社團活動資料
│   │   ├── competition.tsx # 競賽經歷資料
│   │   ├── contact.tsx     # 聯絡資訊資料
│   │   ├── github.ts       # GitHub API 整合
│   │   ├── googleapis.ts   # Google APIs 整合
│   │   ├── language.ts     # 語言設定
│   │   ├── motion.tsx      # 動畫設定
│   │   ├── profile.ts      # 個人資料
│   │   ├── projects.ts     # 作品集資料
│   │   ├── skill.tsx       # 技能資料
│   │   └── work.tsx        # 工作經歷資料
│   ├── styles/             # 樣式檔案
│   │   ├── alert.css       # 通知樣式
│   │   ├── carousel.css    # 輪播樣式
│   │   ├── contact-card.css # 聯絡卡片樣式
│   │   ├── globals.css     # 全域樣式
│   │   ├── menu.css        # 選單樣式
│   │   └── project-card.css # 專案卡片樣式
│   ├── types/              # TypeScript 型別定義
│   │   ├── contact.tsx     # 聯絡資訊型別
│   │   ├── experience.tsx  # 經歷型別
│   │   ├── github.ts       # GitHub 型別
│   │   ├── language.tsx    # 語言型別
│   │   ├── portfolio.ts    # 作品集型別
│   │   └── skill.tsx       # 技能型別
│   └── utils/              # 工具函式
│       ├── education.tsx   # 教育資料處理
│       ├── fetcher.ts      # 資料獲取工具
│       ├── github.ts       # GitHub 工具函式
│       ├── googleapis.ts   # Google API 工具
│       └── url.ts          # URL 處理工具
├── .gitignore              # Git 忽略檔案設定
├── eslint.config.mjs       # ESLint 設定
├── LICENSE                 # 授權檔案
├── next-env.d.ts           # Next.js 型別定義
├── next.config.ts          # Next.js 設定檔
├── package.json            # 專案依賴與腳本
├── postcss.config.mjs      # PostCSS 設定
├── tailwind.config.ts      # Tailwind CSS 設定
├── README.md               # 專案說明文件
└── tsconfig.json           # TypeScript 設定
```

## 📦 安裝與開發

### 環境需求

- Node.js 18.17+
- npm 或 yarn
- Git

### 快速開始

```bash
# 1. 克隆專案
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu

# 2. 安裝依賴套件
npm install

# 3. 開發模式（使用 Turbopack 加速）
npm run dev

# 4. 開啟瀏覽器訪問
# http://localhost:3000
```

### 可用腳本

```bash
# 🚀 開發模式（Turbopack 加速）
npm run dev

# 🔨 建置生產版本
npm run build

# 📦 啟動生產環境
npm start

# 🔍 程式碼品質檢查
npm run lint

# 🧪 型別檢查
npx tsc --noEmit
```

### 開發工具建議

- **IDE**：VS Code + TypeScript + ESLint 擴充套件
- **瀏覽器**：Chrome DevTools + React Developer Tools
- **除錯**：Vercel 本地開發環境
- **版本控制**：Git + GitHub Desktop（選用）

## 📊 監控與分析

### 多重分析工具整合

- 📈 **Google Analytics**：深度使用者行為分析、轉換追蹤
- ⚡ **Vercel Analytics**：即時效能監控、使用者地理分佈
- 🏃 **Speed Insights**：Core Web Vitals 即時監控

### SEO 最佳化策略

- 🏗️ **結構化資料**：Person Schema、WebPage Schema、BreadcrumbList
- 🗺️ **動態 Sitemap**：自動生成包含所有路由的 XML sitemap
- 🤖 **robots.txt**：搜尋引擎爬蟲最佳化指引
- 📱 **Open Graph**：社群媒體分享最佳化
- 🐦 **Twitter Cards**：Twitter 分享卡片最佳化
- 🌐 **多語言 SEO**：hreflang 標籤、語言特定 meta 標籤

## 🎯 核心功能深度解析

### 🖼️ 相簿系統

**技術架構**：Google Drive API + SWR + 動態路由

- 📁 **階層式結構**：年份 → 活動 → 圖片三層架構
- 🔗 **動態路由**：`/album/[year]/[eventName]` SEO 友善 URL
- 🖼️ **圖片最佳化**：懶載入 + Intersection Observer + 模態框預覽
- 📐 **響應式佈局**：CSS Grid 自適應網格排列
- 🗺️ **自動 Sitemap**：動態生成相簿頁面至 sitemap.xml
- 🚀 **效能最佳化**：圖片壓縮 + WebP 格式 + CDN 加速

## 🤝 貢獻指南

歡迎對這個專案提出建議或貢獻！

### 如何貢獻

1. **Fork 專案** → 點擊右上角 Fork 按鈕
2. **建立分支** → `git checkout -b feature/your-feature-name`
3. **提交變更** → `git commit -m "Add some amazing feature"`
4. **推送分支** → `git push origin feature/your-feature-name`
5. **發起 PR** → 建立 Pull Request 並詳述變更內容

### 開發規範

- 📝 **Commit Message**：使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式
- 🧪 **程式碼品質**：確保通過 ESLint 檢查
- 📚 **文件更新**：重要變更需同步更新 README
- 🎯 **型別安全**：維持 100% TypeScript 覆蓋率

## 📞 聯絡資訊

### 開發者：FanYu (范余振富)

- 🌐 **個人網站**：[https://fanyu.vercel.app](https://fanyu.vercel.app)
- 📧 **Email**：[fanyuuu2006@gmail.com](mailto:fanyuuu2006@gmail.com)
- 💼 **LinkedIn**：[Fan-Yu Zhen-Fu](https://www.linkedin.com/in/fan-yu-zhen-fu-461678293/)
- 🐙 **GitHub**：[@fanyuuu2006](https://github.com/fanyuuu2006)
- 📱 **Instagram**：[@fanyu.dev](https://www.instagram.com/fanyu.dev/)

### 技術支援

- 🐛 **Bug 回報**：[GitHub Issues](https://github.com/fanyuuu2006/fanyu/issues)
- 💬 **功能建議**：[GitHub Discussions](https://github.com/fanyuuu2006/fanyu/discussions)
- 📝 **留言板**：[網站留言板](https://fanyu.vercel.app/guestbook)

## 📜 授權條款

本專案採用 [MIT License](https://github.com/fanyuuu2006/fanyu/blob/main/LICENSE) 開源授權

---

**⭐ 如果這個專案對您有幫助，請給個 Star！**

Made with ❤️ by [FanYu](https://fanyu.vercel.app) in Taiwan 🇹🇼
