# 🧑‍💻FanYu 個人網站（Portfolio Website）

由 FanYu（范余振富） 開發的個人作品展示平台，基於 Next.js + TypeScript，整合多語言切換、Google Drive 相簿 API、動態篩選作品集、動畫效果、SEO 等功能，是一個全方位的個人網站。

## 🔗 快速前往

👉 [https://fanyu.vercel.app](https://fanyu.vercel.app)

## 📌 功能特色

- 🚀 Hero 區塊介紹與社群連結

- 🙋 關於我：多段自我敘述

- 🛠 技能展示：依分類呈現技能圖示

- 🎨 作品集區塊：隨機精選與多條件篩選

- 🧭 經歷切換區塊（教育 / 社團 / 工作）

- 🖼 Google Drive 相簿整合（年份 / 活動 / 圖片）

- 📞 聯絡方式整理（社群 / 即時通訊）

- 🌐 支援中英文語言切換

- 🎞 多項動畫呈現（Framer Motion）

## 🧰 技術架構

| 分類         | 技術堆疊                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| 框架         | [Next.js 14 (App Router)](https://nextjs.org/)                                                                      |
| 語言         | [TypeScript](https://www.typescriptlang.org/)                                                                       |
| 樣式         | [Tailwind CSS](https://tailwindcss.com/) + 自訂 CSS 變數                                                            |
| 動畫         | [framer-motion](https://www.framer.com/motion/)                                                                     |
| 圖片處理     | Google Drive + 自建 Image Proxy                                                                                     |
| 圖示         | [Ant Design Icons](https://ant.design/components/icon/) + [react-icons](https://react-icons.github.io/react-icons/) |
| UI 元件      | `fanyucomponents`（自訂元件庫）                                                                                     |
| 通知系統     | [sweetalert2](https://sweetalert2.github.io/)（Toast）                                                              |
| API 整合     | Next.js API Route                                                                                                   |
| 圖片載入優化 | 自訂 `LazyImage` 元件                                                                                               |

## 🗂 專案結構

```plaintext
├── public/                  # 靜態資源（圖片、favicon 等）
├── src/
│   ├── app/                 # App Router 各路由頁面與 API Route
│   ├── components/          # 共用與區塊元件（首頁、作品集、相簿等）
│   ├── context/             # React Context（如 LanguageContext）
│   ├── libs/                 # 資料、工具函式與外部整合模組
│   ├── styles/              # 全域樣式與 CSS Modules
│   ├── types/               # TypeScript 型別定義
│   └── utils/               # 工具方法（資料處理、URL 等）
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🌐 語系切換

語系：中文、英文

方法：Context API 控管並對每段內容提供 LanguageContent 雙語對應

可切換內容：頁面標題、說明文字、Toast、按鈕文字、錯誤頁...

## 📦 安裝與開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev
```

📜 授權

[MIT License](https://github.com/fanyuuu2006/fanyu/blob/main/LICENSE)
