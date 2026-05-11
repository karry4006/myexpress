# 豬肉價格觀察站

這是一個基於 **Node.js + Express.js** 與 **SQLite** 開發的 Web 應用程式，專門用於監測民國 87 年至 114 年間的毛豬市場拍賣價格趨勢。

## 🚀 專案特色
- **自動化數據載入**：每次啟動程式時，系統會自動將歷史豬肉價格數據（87-114年）初始化至 SQLite 資料庫。
- **資料可視化**：整合 **Chart.js** 繪製動態折線圖，支援鼠標懸停顯示精確年份與價格。
- **互動式介面**：使用者可透過 Web 介面新增或修改各年度價格紀錄。
- **現代化設計**：具備高質感的豬隻主題 Banner 與響應式表格展示。

---

## 🛠️ 技術棧 (Tech Stack)
- **前端**：HTML5, CSS3, Vanilla JavaScript, Chart.js (CDN)
- **後端**：Node.js, Express.js
- **資料庫**：SQLite (sqlite3)
- **API 通訊**：Fetch API

---

## 📂 專案結構
```
myexpress/
├── bin/www             # 程式啟動入口
├── public/             # 前端靜態檔案
│   ├── images/         # 圖片資源 (包含 banner)
│   ├── javascripts/    # main.js (圖表邏輯與 API 互動)
│   └── stylesheets/    # style.css (網頁排版與美化)
├── routes/             # 後端 API 路由 (index.js)
├── database.js         # SQLite 資料庫連線與初始化邏輯
├── pork_data.json      # 原始歷史數據 (87-114年)
├── specification.md    # 專案詳細規格書
└── package.json        # 專案相依套件設定
```

---

## ⚙️ 安裝與啟動說明

### 1. 安裝環境
請確保本機已安裝 [Node.js](https://nodejs.org/)。

### 2. 下載並安裝依賴
在專案根目錄執行以下指令：
```bash
npm install
```

### 3. 準備圖片
請將您的標題圖片放入以下路徑，並命名為 `image_de6330bc.png`：
`public/images/image_de6330bc.png`

### 4. 啟動程式
執行以下指令啟動伺服器：
```bash
npm start
```
啟動後，開啟瀏覽器造訪：`http://localhost:3000`

---

## 📖 使用說明
- **瀏覽趨勢**：首頁上方會自動渲染民國 87 年至今的價格折線圖，滑鼠移至點上可看詳情。
- **查看明細**：下方「毛豬(市場拍賣價格)」表格列出所有詳細數值。
- **新增資料**：在「新增/更新資料」表單輸入年份與價格，點擊「送出」後，圖表與表格會立即同步更新。
- **數據重置**：本專案設計為**每次重啟程式時自動重置資料**。若需要回到初始 87-114 年的狀態，只需重開 `npm start` 即可。

---

## 📄 授權與說明
本專案為作業練習用途，數據來源參考中央畜產會之公開資訊。
