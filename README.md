# 🧑‍💻 FanYu 個人網站

由 FanYu（范余振富）開發的個人作品展示平台，基於 Next.js + TypeScript 構建，## 📁 專案結構

````plaintext
├── public/                    # 靜態資源言切換、Google Drive 相簿系統、動態作品集篩選、動畫效果、SEO 優化、留言板等功能的現代化個人網站。

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

- 🖼 **相簿系統**：Google Drive 相簿整合
  - 動態路由：`/album/[year]/[eventName]`
  - 圖片懶載入與模態框預覽
  - 響應式網格佈局
  - SEO 優化與自動 sitemap 生成
- 📝 **留言板**：Giscus 評論系統整合
  - 基於 GitHub Discussions
  - 支援中英文切換
  - 即時更新，無需資料庫
- 🎯 **作品集專頁**：完整作品展示與篩選
  - 多標籤篩選系統
  - 時間排序（最新/最舊）
  - 動態計數顯示
  - 響應式卡片佈局
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
- 🎨 **自訂元件**：fanyucomponents 元件庫
- 🌟 **程式碼高亮**：c063 語法高亮元件

## 🛠 技術架構

| 分類       | 技術堆疊                                                                                |
| ---------- | --------------------------------------------------------------------------------------- |
| 核心框架   | Next.js (App Router) + Turbopack                                                       |
| 開發語言   | TypeScript                                                                              |
| UI 框架    | React                                                                                   |
| 樣式系統   | Tailwind CSS + styled-components                                                       |
| 動畫效果   | framer-motion                                                                           |
| 圖片處理   | Google Drive API + Next.js Image 優化                                                  |
| 圖示庫     | Ant Design Icons + react-icons                                                         |
| UI 元件    | fanyucomponents（自訂元件庫）+ Ant Design                                              |
| 通知系統   | sweetalert2                                                                             |
| 評論系統   | Giscus（GitHub Discussions）                                                           |
| 資料獲取   | SWR + Next.js API Routes                                                               |
| 程式碼高亮 | c063（自開發元件）                                                                      |
| 網站地圖   | next-sitemap                                                                            |
| HTTP 客戶端 | gaxios + googleapis                                                                     |
| 網站分析   | Vercel Analytics + Speed Insights                                                      |
| 部署平台   | Vercel                                                                                  |

## � 專案結構

```plaintext
├── public/ # 靜態資源
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── album/ # 相簿系統
│ │ │ ├── [year]/ # 年份動態路由
│ │ │ │ └── [eventName]/ # 活動動態路由
│ │ ├── api/ # API 路由
│ │ │ ├── album/ # 相簿 API
│ │ │ ├── image/ # 圖片 API
│ │ │ └── proxy-image/ # 圖片代理 API
│ │ ├── guestbook/ # 留言板頁面
│ │ ├── my/ # 個人頁面（倒計時）
│ │ ├── projects/ # 作品集專頁
│ │ │ └── [title]/ # 專案詳情頁面
│ │ ├── layout.tsx # 根佈局
│ │ ├── page.tsx # 首頁
│ │ └── sitemap.ts # 動態網站地圖
│ ├── components/ # React 元件
│ │ ├── album/ # 相簿相關元件
│ │ ├── custom/ # 自訂通用元件
│ │ ├── guestbook/ # 留言板元件
│ │ ├── Header/ # 導航列元件
│ │ ├── Index/ # 首頁各區塊元件
│ │ ├── my/ # 個人頁面元件
│ │ └── projects/ # 作品集元件
│ ├── contexts/ # React Context 狀態管理
│ ├── hooks/ # 自訂 React Hooks
│ ├── libs/ # 資料與工具函式
│ ├── styles/ # 樣式檔案
│ ├── types/ # TypeScript 型別定義
│ └── utils/ # 工具函式
├── eslint.config.mjs # ESLint 設定
├── next.config.ts # Next.js 設定
├── package.json # 專案依賴
├── tailwind.config.ts # Tailwind CSS 設定
└── tsconfig.json # TypeScript 設定

````

## � 快速開始

### 環境需求

- Node.js 18+
- npm 或 yarn

### 安裝與執行

```bash
# 克隆專案
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu

# 安裝依賴
npm install

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

## 📊 性能優化與 SEO

- 🏗️ **結構化資料**：Person Schema、WebPage Schema、BreadcrumbList
- 🗺️ **動態 Sitemap**：自動生成包含所有路由的 XML sitemap
- 🤖 **robots.txt**：搜尋引擎爬蟲優化
- 📱 **Open Graph**：社群媒體分享優化
- 🐦 **Twitter Cards**：Twitter 分享卡片
- 🌐 **多語言 SEO**：hreflang 標籤、語言特定 meta 標籤
- ⚡ **Core Web Vitals**：即時效能監控
- 📈 **網站分析**：Vercel Analytics 深度整合

## 📜 授權條款

本專案採用 MIT License 開源授權

---

**⭐ 如果這個專案對您有幫助，請給個 Star！**

Made with ❤️ by [FanYu](https://fanyu.vercel.app) in Taiwan 🇹🇼
