# 🧑‍💻FanYu 個人網站（Portfolio Website）

由 FanYu（范余振富） 開發的個人作品展示平台，基於 Next.js 15 + TypeScript，整合多語言切換、Google Drive 相簿 API、動態篩選作品集、動畫效果、SEO、留言板、生日倒計時等功能，是一個全方位的個人網站。

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
- 📝 **留言板**：整合 Giscus 評論系統
- 🎯 **作品集專頁**：完整作品展示與篩選
- ⏰ **個人頁面**：生日倒計時器

### 🌐 系統功能

- 🌐 支援中英文語言切換
- 🎞 多項動畫呈現（Framer Motion）
- 📱 響應式設計
- 🔍 SEO 優化（結構化資料、sitemap、robots.txt）
- 📊 網站分析（Google Analytics、Vercel Analytics、Speed Insights）

## 🧰 技術架構

| 分類         | 技術堆疊                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| 框架         | [Next.js 15 (App Router)](https://nextjs.org/) + Turbopack                                                          |
| 語言         | [TypeScript](https://www.typescriptlang.org/)                                                                       |
| 樣式         | [Tailwind CSS 4](https://tailwindcss.com/) + 自訂 CSS 變數                                                          |
| 動畫         | [framer-motion](https://www.framer.com/motion/)                                                                     |
| 圖片處理     | Google Drive + 自建 Image Proxy                                                                                     |
| 圖示         | [Ant Design Icons](https://ant.design/components/icon/) + [react-icons](https://react-icons.github.io/react-icons/) |
| UI 元件      | `fanyucomponents`（自訂元件庫）+ [Ant Design](https://ant.design/)                                                  |
| 通知系統     | [sweetalert2](https://sweetalert2.github.io/)（Toast）                                                              |
| 評論系統     | [Giscus](https://giscus.app/)（GitHub Discussions）                                                                 |
| 資料獲取     | [SWR](https://swr.vercel.app/) + Next.js API Route                                                                  |
| 圖片載入優化 | 自訂 `LazyImage` 元件                                                                                               |
| 程式碼高亮   | [c063](https://www.npmjs.com/package/c063)                                                                          |
| 網站分析     | [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights)         |
| 部署平台     | [Vercel](https://vercel.com/)                                                                                       |

## 🗂 專案結構

```plaintext
├── public/                  # 靜態資源（圖片、favicon 等）
│   ├── Portfolio/          # 作品集圖片
│   └── robots.txt          # 搜尋引擎爬蟲設定
├── src/
│   ├── app/                # App Router 各路由頁面與 API Route
│   │   ├── album/          # 相簿系統路由
│   │   ├── api/            # API 路由（相簿、圖片代理）
│   │   ├── guestbook/      # 留言板頁面
│   │   ├── my/             # 個人頁面（生日倒計時）
│   │   ├── projects/       # 作品集專頁
│   │   ├── error.tsx       # 錯誤頁面
│   │   ├── layout.tsx      # 根佈局
│   │   ├── metadata.ts     # 網站元資料
│   │   ├── not-found.tsx   # 404 頁面
│   │   ├── page.tsx        # 首頁
│   │   └── sitemap.ts      # 動態 sitemap 生成
│   ├── components/         # 共用與區塊元件
│   │   ├── album/          # 相簿相關元件
│   │   ├── custom/         # 自訂元件（Carousel、Toast、LazyImage 等）
│   │   ├── guestbook/      # 留言板元件
│   │   ├── Header/         # 導航列元件
│   │   ├── Index/          # 首頁各區塊元件
│   │   ├── my/             # 個人頁面元件
│   │   ├── projects/       # 作品集元件
│   │   ├── Footer.tsx      # 頁尾
│   │   └── LanguageSwitchButton.tsx # 語言切換按鈕
│   ├── context/            # React Context（LanguageContext）
│   ├── hooks/              # 自訂 Hooks
│   ├── libs/               # 資料、工具函式與外部整合模組
│   ├── styles/             # 全域樣式與 CSS Modules
│   ├── types/              # TypeScript 型別定義
│   └── utils/              # 工具方法（資料處理、URL、fetcher 等）
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── postcss.config.mjs
├── eslint.config.mjs
├── next.config.ts
└── tsconfig.json
```

## 🌐 語系切換

**語系**：中文、英文

**方法**：Context API 控管並對每段內容提供 LanguageContent 雙語對應

**可切換內容**：

- 頁面標題、說明文字、Toast 訊息
- 按鈕文字、錯誤頁面
- 導航列、頁尾
- 所有功能區塊內容

## 📦 安裝與開發

```bash
# 安裝依賴
npm install

# 開發模式（使用 Turbopack）
npm run dev

# 建置專案
npm run build

# 啟動生產環境
npm start

# 程式碼檢查
npm run lint
```

## 🚀 部署

專案部署於 [Vercel](https://vercel.com/)，支援：

- **自動部署**：GitHub 推送自動觸發部署
- **預覽部署**：Pull Request 自動生成預覽連結
- **效能監控**：Vercel Analytics 與 Speed Insights
- **CDN 加速**：全球邊緣節點加速

## 📊 網站分析

- **Google Analytics**：追蹤網站流量與使用者行為
- **Vercel Analytics**：即時效能監控
- **Speed Insights**：Core Web Vitals 分析
- **結構化資料**：SEO 優化（Person、WebPage Schema）

## 🎯 主要功能詳述

### 相簿系統

- 整合 Google Drive API
- 動態路由：`/album/[year]/[eventName]`
- 圖片懶載入與模態框預覽
- 響應式網格佈局
- 自動生成 sitemap

### 作品集篩選

- 多標籤篩選系統
- 時間排序（最新/最舊）
- 動態計數顯示
- 響應式卡片佈局

### 留言板

- 基於 GitHub Discussions
- 支援中英文切換
- 即時更新
- 無需資料庫

### 生日倒計時

- 即時倒計時顯示
- 響應式設計
- 多語言支援

## 📜 授權

[MIT License](https://github.com/fanyuuu2006/fanyu/blob/main/LICENSE)
