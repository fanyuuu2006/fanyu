# FanYu

> 范余振富的個人作品集網站，使用 Next.js App Router、TypeScript 與現代 React 模式打造。

---

## 概述

 這是范余振富的個人網站與作品集，用於以簡潔、響應式的格式呈現個人簡介、技能、工作經歷與精選專案。它被設計為一個對外公開的首頁，幫助訪客快速了解作者的背景、技術重點與近期作品。

此網站將靜態內容與互動式區塊結合，例如專案作品集、由 Giscus 驅動的留言板，以及客戶端主題切換功能。網站同時也包含 SEO 導向的中繼資料、結構化資料、分析工具與速度監控。

此專案適合想要展示自己作品、發佈個人首頁，或想研究如何組織現代 Next.js App Router 網站的內容、互動性與 Vercel 部署方式的開發者。

---

## 功能特色

- 針對桌機與行動裝置優化的響應式個人作品集版面。
- 基於 App Router 的結構，包含作品集與留言板內容的巢狀頁面。
- 支援主題感知的 UI，並可在客戶端切換主題。
- 具有可重複使用區塊與專案詳情頁面的作品集展示頁。
- 使用 Giscus 整合的留言板功能，供社群留言互動。
- SEO 友善的中繼資料、Open Graph 資料、robots 規則與標準網址（canonical URLs）。
- 注入結構化資料，讓搜尋引擎能有更豐富的理解。
- 使用 Google Analytics Data API 路由提供網站分析報告。
- 整合 Vercel Analytics 與 Speed Insights，提供執行階段的可視化資訊。
- 支援 Markdown 渲染，包含 GitHub Flavored Markdown 與語法高亮。

---

## 技術棧

| 類別       | 技術                                                              |
| ---------- | ----------------------------------------------------------------- |
| 框架       | Next.js 16（App Router）                                          |
| UI 函式庫  | React 19                                                          |
| 語言       | TypeScript                                                        |
| 樣式       | Tailwind CSS 4、全域 CSS                                          |
| 動畫       | Framer Motion                                                     |
| Markdown   | React Markdown、remark-gfm、rehype-raw、Shiki                     |
| 留言功能   | Giscus                                                            |
| 分析       | Google Analytics Data API、Vercel Analytics 與 Speed Insights     |
| 部署       | Vercel                                                            |

---

## 專案結構

```text
src/
 app/          # App Router 頁面、版面配置、中繼資料、robots、sitemap 與 API 路由
 components/   # 可重複使用的 UI 元件與功能區塊
 contexts/     # React contexts，例如主題管理
 hooks/        # 用於路由與作品集狀態的自訂 hooks
 libs/         # 內容資料、網站設定、路由定義與環境變數輔助工具
 styles/       # 全域樣式與特定功能的 CSS
 types/        # 共用的 TypeScript 型別
 utils/        # 用於格式化與渲染的工具函式
public/         # 靜態資源，如圖片與圖示
```

- `src/app/` 存放 App Router 的進入點，包括首頁、作品集頁面、留言板、sitemap、robots 以及分析 API 路由。
- `src/components/` 包含首頁與作品集視圖所使用的可重複版面元件與內容區塊。
- `src/libs/` 儲存網站內容模型、路由定義與環境變數存取工具。
- `src/contexts/` 提供跨元件共用的 UI 狀態，例如目前的主題。
- `src/styles/` 包含全域樣式表與相關的輔助 CSS 資源。
- `public/` 提供整個網站所使用的靜態圖片與圖示。

---

## 開始使用

### 複製專案

```bash
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu
```

### 安裝套件

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 建置

```bash
npm run build
```

### 正式環境執行

```bash
npm run start
```

若你偏好使用其他套件管理工具，只要在安裝、建置與啟動指令中保持一致使用，並確保 lockfile 與 scripts 同步即可。

---

## 環境變數

建立一個 `.env.local` 檔案，用於存放執行階段的機密資訊與部署相關的設定值：

```env
NEXT_PUBLIC_SITE_URL=
GA_PROPERTY_ID=
GA_CLIENT_EMAIL=
GA_PRIVATE_KEY=
```

- `NEXT_PUBLIC_SITE_URL` 設定中繼資料、API 呼叫與絕對連結所使用的公開標準網址。
- `GA_PROPERTY_ID` 是分析 API 路由所使用的 Google Analytics 資源屬性 ID。
- `GA_CLIENT_EMAIL` 是用於存取 Google Analytics Data API 的服務帳戶電子郵件。
- `GA_PRIVATE_KEY` 是服務帳戶的私密金鑰。換行符號需在環境檔案中進行跳脫（escape），並在程式碼中正規化處理。

> 此網站目前留言板功能使用寫死（hardcoded）的 Giscus 設定，因此不需要額外的環境變數即可使用留言功能。

---

## 部署

此專案已可直接部署於 Vercel。

### 建置指令

```bash
npm run build
```

### 輸出結果

Next.js 會將正式環境的建置結果產生於 `.next` 目錄中，Vercel 會在部署過程中自動使用此目錄。

### Vercel 環境變數

在啟用正式環境流量之前，請在 Vercel 專案設定中設定與上方相同的環境變數。

### 建議的 Vercel 工作流程

- 針對推送到 main 分支的變更進行自動部署（Automatic Deployment）。
- 針對 pull request 與功能分支進行預覽部署（Preview Deployment）。
- 合併後針對 main 分支進行正式環境部署（Production Deployment）。

---

## 授權

本專案採用 MIT 授權條款。詳情請參閱 [LICENSE](LICENSE) 檔案。
