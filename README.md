# FanYu 個人網站（Portfolio Website）

這是一個由 [FanYu (范余振富)](https://fanyu.vercel.app) 所開發的個人網站，使用 [Next.js](https://nextjs.org/) 和 [TypeScript](https://www.typescriptlang.org/) 建構，並整合了多語言切換、Google Drive 相簿 API、作品集篩選、社群聯繫、SEO 結構化資料、動畫效果等功能。

## 🔥 線上預覽

👉 [https://fanyu.vercel.app](https://fanyu.vercel.app)

## 📌 功能總覽

- Hero 區塊介紹與社群連結
- 關於我：多段自我敘述
- 技能展示：依分類展示技能圖示
- 作品集區塊：隨機精選＋篩選頁
- 學經歷切換區塊（Education / Club / Work）
- Google Drive 相簿整合（年份 / 活動 / 圖片）
- 聯絡方式整理（社群 / 即時通訊）
- 中英文語言切換
- 多項動畫呈現（framer-motion）
- SEO 結構化資料與社群分享標籤（`<meta>` / Open Graph / Twitter）

## 🛠 使用技術

| 類別      | 技術堆疊                        |
| --------- | ------------------------------- |
| 框架      | Next.js 14 (App Router)         |
| 語言      | TypeScript                      |
| 樣式      | Tailwind CSS + 自訂 CSS 變數    |
| 動畫      | framer-motion                   |
| 圖片處理  | Google Drive + 自建 Image Proxy |
| 社群圖示  | Ant Design Icons + react-icons  |
| 輔助元件  | fanyucomponents（自訂組件庫）   |
| 通知      | sweetalert2 (Toast)             |
| API 整合  | Next.js API Route               |
| Lazy 圖片 | 自訂 LazyImage 元件             |

## 🌐 語系切換

語系：中文、英文

方法：Context API 控管並對每段內容提供 LanguageContent 雙語對應

可切換內容：頁面標題、說明文字、Toast、按鈕文字、錯誤頁...

## 📦 安裝與開發

``` bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 編譯建置
npm run build

# 啟動產線伺服器
npm start

```

📜 授權

MIT License
