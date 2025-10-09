# 🧑‍💻 FanYu 個人網站

由 FanYu（范余振富）開發的個人作品展示平台，基於 Next.js + TypeScript 構建，整合多語言切換、Google Drive 相簿系統、動態作品集篩選、Framer Motion 動畫效果、SEO 優化、GitHub Discussions 留言板等功能的現代化個人網站。

## 🔗 線上預覽

👉 **[https://fanyu.vercel.app](https://fanyu.vercel.app)**

## 🎯 核心功能

### 🏠 首頁功能

- 🚀 **Hero 區塊**：個人介紹與社群連結，包含動態打字效果
- 🙋 **關於我**：多段自我敘述展示
- 🛠 **技能展示**：依分類呈現技能圖示（前端、後端、開發工具）
- 🎨 **作品集預覽**：隨機精選與多條件篩選
- 🧭 **經歷切換**：教育 / 社團 / 工作 / 競賽四大類別
- 📞 **聯絡方式**：社群媒體與即時通訊整合

### 📚 專頁功能

- 🖼 **相簿系統**：Google Drive API 整合
  - 動態路由：`/album/[year]/[eventName]`
  - 圖片懶載入與模態框預覽
  - 響應式網格佈局與無限滾動
  - SEO 優化與自動 sitemap 生成
- 📝 **留言板**：Giscus 評論系統整合
  - 基於 GitHub Discussions
  - 支援中英文切換
  - 即時更新，無需後端資料庫
- 🎯 **作品集專頁**：完整作品展示與篩選
  - 多標籤篩選系統（語言、角色、領域、框架等）
  - 時間排序（最新/最舊）
  - 動態計數顯示與搜尋過濾
  - 響應式卡片佈局
  - GitHub 討論區整合
- ⏰ **個人頁面**：生日倒計時器
  - 即時倒計時顯示
  - 響應式設計
  - 多語言支援

### 🌐 系統特色

- 🌐 **多語言支援**：中英文語言切換（Context API 管理）
- 🎞 **動畫效果**：Framer Motion 驅動的流暢動畫
- 📱 **響應式設計**：支援各種裝置螢幕尺寸
- 🔍 **SEO 優化**：結構化資料、動態 sitemap、robots.txt
- 📊 **網站分析**：Vercel Analytics 與 Speed Insights 整合
- 🚀 **現代化開發**：TypeScript、ESLint、Turbopack 支援
- 🎨 **自訂元件**：fanyucomponents 元件庫與 c063 語法高亮
- 🔒 **安全代理**：內建 API 代理防護外部資源存取
- 💾 **本地化存儲**：SWR 快取機制優化資料載入

## 🛠 技術架構

| 分類        | 技術堆疊                                  |
| ----------- | ----------------------------------------- |
| 核心框架    | Next.js 15.3.4 (App Router) + Turbopack   |
| 開發語言    | TypeScript 5                              |
| UI 框架     | React 19.1.0                              |
| 樣式系統    | Tailwind CSS 4.1.11                       |
| 動畫效果    | Framer Motion 12.18.1                     |
| 圖片處理    | Google Drive API + Next.js Image 優化     |
| 圖示庫      | Ant Design Icons 6.0.0 + React Icons 5.5.0 |
| UI 元件     | fanyucomponents 2.11.1 + Ant Design 5.26.1 |
| 樣式工具    | clsx 2.1.1 + tailwind-merge 3.3.1 + styled-components 6.1.19 |
| 通知系統    | SweetAlert2 11.22.0                       |
| 評論系統    | Giscus 3.1.0（GitHub Discussions）        |
| 資料獲取    | SWR 2.3.3 + Next.js API Routes            |
| 程式碼高亮  | c063 1.6.3（自開發元件）                  |
| 網站地圖    | next-sitemap 4.2.3                        |
| HTTP 客戶端 | gaxios 7.1.0 + googleapis 150.0.1         |
| 網站分析    | Vercel Analytics 1.5.0 + Speed Insights 1.2.0 |
| 部署平台    | Vercel                                    |

## 📁 專案結構

```plaintext
├── public/                    # 靜態資源
│   ├── cbg.jpg               # 首頁背景圖
│   ├── favicon.ico           # 網站圖標
│   ├── GameShow.jpg          # 社群分享圖
│   ├── logo.png              # 品牌標誌
│   └── robots.txt            # 搜尋引擎規則
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── album/            # 相簿系統
│   │   │   └── [year]/       # 年份動態路由
│   │   │       └── [eventName]/  # 活動動態路由
│   │   ├── api/              # API 路由
│   │   │   ├── album/        # 相簿 API
│   │   │   │   └── [year]/   # 年份 API
│   │   │   ├── image/        # 圖片代理 API
│   │   │   └── proxy/        # 安全代理 API
│   │   ├── guestbook/        # 留言板頁面
│   │   ├── my/               # 個人頁面（倒計時）
│   │   ├── projects/         # 作品集專頁
│   │   │   └── [title]/      # 專案詳情頁面
│   │   ├── layout.tsx        # 根佈局
│   │   ├── page.tsx          # 首頁
│   │   ├── metadata.ts       # SEO 元資料
│   │   ├── sitemap.ts        # 動態網站地圖
│   │   ├── error.tsx         # 錯誤頁面
│   │   └── not-found.tsx     # 404 頁面
│   ├── components/           # React 元件
│   │   ├── Footer.tsx        # 頁尾元件
│   │   ├── LanguageSwitchButton.tsx  # 語言切換按鈕
│   │   ├── routes.tsx        # 路由設定
│   │   ├── album/            # 相簿相關元件
│   │   │   ├── EventLinkCard.tsx     # 活動連結卡片
│   │   │   ├── MainSection.tsx       # 相簿主區塊
│   │   │   ├── YearDiv.tsx           # 年份區塊
│   │   │   └── [year]/[eventName]/   # 活動頁面元件
│   │   ├── custom/           # 自訂通用元件
│   │   │   ├── Carousel.tsx          # 輪播元件
│   │   │   ├── CodeCard.tsx          # 程式碼卡片
│   │   │   ├── CopyButton.tsx        # 複製按鈕
│   │   │   ├── CustomLink.tsx        # 自訂連結
│   │   │   ├── Title.tsx             # 標題元件
│   │   │   └── Toast.ts              # 通知元件
│   │   ├── guestbook/        # 留言板元件
│   │   │   └── MainSection.tsx       # 留言板主區塊
│   │   ├── Header/           # 導航列元件
│   │   │   ├── BurgerMenu.tsx        # 漢堡選單
│   │   │   ├── DesktopLink.tsx       # 桌面版連結
│   │   │   ├── Header.tsx            # 導航列主體
│   │   │   └── MobileLink.tsx        # 行動版連結
│   │   ├── Index/            # 首頁各區塊元件
│   │   │   ├── AboutMeSection/       # 關於我區塊
│   │   │   ├── ContactSection/       # 聯絡區塊
│   │   │   ├── ExperienceSection/    # 經歷區塊
│   │   │   ├── HeroSection/          # 英雄區塊
│   │   │   ├── PortfolioSection/     # 作品集區塊
│   │   │   └── SkillsSection/        # 技能區塊
│   │   ├── my/               # 個人頁面元件
│   │   │   ├── MainSection.tsx       # 主區塊
│   │   │   └── TimerCard.tsx         # 倒計時卡片
│   │   └── projects/         # 作品集元件
│   │       ├── MainSection.tsx       # 主區塊
│   │       ├── ProjectCard.tsx       # 專案卡片
│   │       └── ProjectTagCheckbox.tsx # 標籤篩選框
│   ├── contexts/             # React Context 狀態管理
│   │   ├── AlbumContext.tsx  # 相簿狀態管理
│   │   └── LanguageContext.tsx       # 語言狀態管理
│   ├── hooks/                # 自訂 React Hooks
│   │   └── useTimeOrderTabs.tsx      # 時間排序標籤頁 Hook
│   ├── libs/                 # 資料與設定檔案
│   │   ├── album.tsx         # 相簿資料
│   │   ├── club.tsx          # 社團資料
│   │   ├── competition.tsx   # 競賽資料
│   │   ├── contact.tsx       # 聯絡資料
│   │   ├── github.ts         # GitHub 設定
│   │   ├── googleapis.ts     # Google APIs 設定
│   │   ├── language.ts       # 語言設定
│   │   ├── motion.tsx        # 動畫設定
│   │   ├── profile.ts        # 個人資料
│   │   ├── projects.ts       # 專案資料
│   │   ├── skill.tsx         # 技能資料
│   │   ├── work.tsx          # 工作資料
│   │   └── education/        # 教育經歷資料
│   │       ├── index.tsx     # 教育資料匯出
│   │       ├── cpshs.tsx     # 中和高中
│   │       ├── fgjh.tsx      # 福和國中
│   │       ├── gses.tsx      # 秀朗國小
│   │       └── ntust.tsx     # 台科大
│   ├── styles/               # 樣式檔案
│   │   ├── alert.css         # 警告樣式
│   │   ├── carousel.css      # 輪播樣式
│   │   ├── globals.css       # 全域樣式
│   │   ├── menu.css          # 選單樣式
│   │   └── project-card.css  # 專案卡片樣式
│   ├── types/                # TypeScript 型別定義
│   │   ├── album.tsx         # 相簿型別
│   │   ├── contact.tsx       # 聯絡型別
│   │   ├── experience.tsx    # 經歷型別
│   │   ├── github.ts         # GitHub 型別
│   │   ├── language.tsx      # 語言型別
│   │   ├── portfolio.ts      # 作品集型別
│   │   └── skill.tsx         # 技能型別
│   └── utils/                # 工具函式
│       ├── album.tsx         # 相簿工具
│       ├── className.tsx     # 樣式類別工具
│       ├── education.tsx     # 教育工具
│       ├── fetcher.ts        # 資料獲取工具
│       ├── github.ts         # GitHub 工具
│       ├── googleapis.ts     # Google APIs 工具
│       └── url.ts            # URL 工具
├── eslint.config.mjs         # ESLint 設定
├── next.config.ts            # Next.js 設定
├── next-env.d.ts             # Next.js 型別定義
├── package.json              # 專案依賴與腳本
├── postcss.config.mjs        # PostCSS 設定
├── tailwind.config.ts        # Tailwind CSS 設定
└── tsconfig.json             # TypeScript 設定
```

## 🚀 快速開始

### 環境需求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 安裝與執行

```bash
# 克隆專案
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu

# 安裝依賴
npm install
# 或
yarn install
# 或  
pnpm install

# 開發模式（使用 Turbopack 加速）
npm run dev

# 開啟瀏覽器訪問 http://localhost:3000
```

### 可用指令

```bash
npm run dev    # 開發模式（Turbopack 加速）
npm run build  # 建置生產版本
npm start      # 啟動生產環境
npm run lint   # 程式碼品質檢查
```

### 環境變數設定

建立 `.env.local` 檔案並設定以下變數：

```env
# Google Drive API 設定
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_service_account_private_key
GOOGLE_DRIVE_ROOT_FOLDER_ID=your_root_folder_id
```

## 📊 性能優化與 SEO

- 🏗️ **結構化資料**：Person Schema、WebPage Schema、BreadcrumbList
- 🗺️ **動態 Sitemap**：自動生成包含所有路由的 XML sitemap
- 🤖 **robots.txt**：搜尋引擎爬蟲優化
- 📱 **Open Graph**：社群媒體分享優化
- 🐦 **Twitter Cards**：Twitter 分享卡片
- 🌐 **多語言 SEO**：hreflang 標籤、語言特定 meta 標籤
- ⚡ **Core Web Vitals**：即時效能監控
- 📈 **網站分析**：Vercel Analytics 深度整合
- 🖼️ **圖片優化**：Next.js Image 組件與懶載入
- 🔄 **資料快取**：SWR 快取機制優化載入速度

## 🎨 主要功能特色

### 🖼️ 相簿系統

- **Google Drive 整合**：直接從 Google Drive 載入圖片
- **動態路由**：年份與活動名稱的嵌套路由
- **圖片優化**：懶載入、響應式圖片處理
- **模態框預覽**：大圖預覽與導航功能

### 🎯 作品集展示

- **多維度篩選**：依語言、角色、領域、工具篩選
- **GitHub 整合**：顯示儲存庫徽章與統計資料
- **討論功能**：每個專案都有獨立的討論區
- **響應式佈局**：適配各種螢幕尺寸

### 💬 留言板系統

- **GitHub Discussions**：基於 GitHub 的評論系統
- **多語言支援**：自動切換中英文介面
- **即時更新**：無需重新整理頁面
- **無資料庫**：完全依賴 GitHub 基礎設施

## 📜 授權條款

本專案採用 MIT License 開源授權

---

**⭐ 如果這個專案對您有幫助，請給個 Star！**

Made with ❤️ by [FanYu](https://fanyu.vercel.app) in Taiwan 🇹🇼
