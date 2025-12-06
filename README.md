# 🧑‍💻 FanYu 個人網站

這是一個由 FanYu（范余振富）精心打造的個人作品展示平台。網站採用 Next.js 與 TypeScript 構建，不僅是一個靜態的作品集，更整合了 Google Drive 相簿、動態作品篩選、桌遊收藏管理以及 GitHub Discussions 留言板等功能，是一個充滿現代化技術與個人特色的數位名片。

## 🔗 線上傳送門

👉 **[https://fanyu.vercel.app](https://fanyu.vercel.app)**

## 🌟 核心特色

### 🏠 豐富的首頁體驗

- 👋 **Hero 區塊**：以動態打字效果呈現的個人介紹，搭配社群連結，讓訪客第一眼就能認識我。
- 🙋 **關於我**：透過多段落的自我敘述，深入分享我的背景與故事。
- 🛠 **技能樹**：將技能分為前端、後端與開發工具三大類，以圖示化方式清晰展示。
- 🎨 **精選作品**：首頁隨機展示精選專案，並提供多條件篩選功能，快速找到感興趣的作品。
- 🧭 **經歷軌跡**：完整收錄教育、社團、工作與競賽經歷，記錄成長的每一步。
- 📞 **保持聯繫**：整合各大社群媒體與即時通訊軟體，隨時都能聯繫到我。

### 🚀 多元的功能專頁

- 📸 **雲端相簿**：深度整合 Google Drive API，將雲端硬碟直接變身為網站相簿。
  - 支援年份與活動的動態路由 (`/album/[year]/[eventName]`)。
  - 具備圖片懶載入 (Lazy Loading) 與模態框 (Modal) 預覽，瀏覽體驗流暢。
  - 自動生成 Sitemap 與 SEO 優化，讓回憶更容易被搜尋。
- 🎲 **桌遊收藏**：專屬的桌遊管理系統，記錄了我的桌遊收藏狀態。
  - 詳細列出庫存、借閱狀態、配件狀況等資訊。
  - 整合搜尋與篩選功能，輕鬆管理個人收藏。
- 💬 **互動留言板**：基於 Giscus 的評論系統，讓訪客能輕鬆留言互動。
  - 直接串接 GitHub Discussions，無需傳統後端資料庫。
  - 支援 Markdown 語法與中英文介面切換，即時更新留言內容。
- 💼 **作品集專區**：完整的專案展示空間。
  - 強大的多標籤篩選系統（語言、角色、領域、框架等）。
  - 支援時間排序與關鍵字搜尋，並整合 GitHub 數據顯示專案熱度。
- ⏳ **個人時光機**：包含生日倒數計時器等趣味小工具，支援多語言與響應式設計。

### 🌐 現代化系統架構

- 🌍 **無縫多語言**：內建中英文切換功能，透過 Context API 進行全站狀態管理。
- 🎞 **流暢動畫**：運用 Framer Motion 打造細膩的轉場與互動效果，提升視覺質感。
- 📱 **全裝置適配**：精心設計的響應式排版，在手機、平板與桌機上都能完美呈現。
- 🔍 **SEO 友善**：落實結構化資料、動態 Sitemap 與 Robots.txt 設定，提升搜尋引擎能見度。
- 🛡️ **安全防護**：內建 API 代理機制，保護外部資源存取，提升網站安全性。
- ⚡ **極速效能**：結合 Vercel Analytics 與 Speed Insights 監控，並透過 SWR 快取機制優化資料載入速度。

## 🛠 技術堆疊

| 分類 | 技術項目 |
| :--- | :--- |
| **核心框架** | Next.js 16.0.7 (App Router) + Turbopack |
| **開發語言** | TypeScript 5 |
| **UI 框架** | React 19.2.1 |
| **樣式系統** | Tailwind CSS 4.1.17 + PostCSS |
| **動畫效果** | Framer Motion 12.23.25 |
| **UI 元件庫** | fanyucomponents 2.11.2 + Ant Design 6.0.1 |
| **圖示資源** | Ant Design Icons 6.1.0 + React Icons 5.5.0 |
| **資料串接** | Google Drive API (googleapis 167.0.0) + SWR 2.3.7 |
| **評論系統** | Giscus 3.1.0 (GitHub Discussions) |
| **程式碼高亮** | c063 1.6.5 (自研元件) |
| **網站分析** | Vercel Analytics + Speed Insights |
| **部署平台** | Vercel |

## 📁 專案結構概覽

```plaintext
├── public/                    # 靜態資源 (圖片、圖標、robots.txt)
├── src/
│   ├── app/                  # Next.js App Router 核心路由
│   │   ├── album/            # 相簿系統 (含動態路由)
│   │   ├── api/              # API Routes (相簿、代理)
│   │   ├── bgc/              # 桌遊收藏頁面
│   │   ├── guestbook/        # 留言板頁面
│   │   ├── my/               # 個人頁面 (倒數計時)
│   │   ├── projects/         # 作品集專頁
│   │   └── ...               # 首頁與基礎頁面
│   ├── components/           # React 元件庫
│   │   ├── album/            # 相簿相關元件
│   │   ├── bgc/              # 桌遊相關元件
│   │   ├── custom/           # 通用自訂元件 (Carousel, CodeCard 等)
│   │   ├── guestbook/        # 留言板元件
│   │   ├── Header/           # 導航列元件
│   │   ├── Index/            # 首頁各區塊元件 (Hero, About, Skills 等)
│   │   ├── my/               # 個人頁面元件
│   │   └── projects/         # 作品集元件
│   ├── contexts/             # 全域狀態 (語言、相簿)
│   ├── hooks/                # 自訂 Hooks (Debounce, Modal 等)
│   ├── libs/                 # 靜態資料與設定檔 (經歷、技能、設定)
│   ├── styles/               # 全域與模組化樣式
│   ├── types/                # TypeScript 型別定義
│   └── utils/                # 工具函式庫 (API 封裝、資料處理)
├── ...                       # 設定檔 (Tailwind, Next.js, ESLint 等)
```

## 🚀 快速開始

### 環境準備

- Node.js 18+
- npm / yarn / pnpm

### 安裝與啟動

```bash
# 1. 克隆專案
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器 (支援 Turbopack)
npm run dev

# 4. 開啟瀏覽器訪問 http://localhost:3000
```

### 常用指令

- `npm run dev`: 啟動開發模式
- `npm run build`: 建置生產版本
- `npm start`: 執行生產環境
- `npm run lint`: 檢查程式碼品質

### 環境變數 (.env.local)

若需完整執行相簿功能，請設定以下變數：

```env
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_service_account_private_key
GOOGLE_DRIVE_ROOT_FOLDER_ID=your_root_folder_id
```

## 📜 授權資訊

本專案採用 **MIT License** 開源授權。

---

**⭐ 如果你喜歡這個專案，歡迎在 GitHub 上給個 Star！**

Made with ❤️ by [FanYu](https://fanyu.vercel.app) in Taiwan
