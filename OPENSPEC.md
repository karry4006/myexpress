# 豬肉價格觀察站 - 實作過程紀錄 (OpenSpec)

## 1. 專案概述
本專案開發一個「豬肉價格觀察站」，展示民國 87 年至 114 年間的毛豬市場拍賣趨勢。系統採用 Node.js Express 框架搭配 SQLite 資料庫，並透過 Chart.js 進行數據可視化。

## 2. 實作流程紀錄

### 階段一：環境配置與規格定義
*   **初始化專案**：使用 Express Generator 建立基本骨架。
*   **套件安裝**：安裝 `sqlite3` 作為資料庫驅動程式。
*   **規格定義**：撰寫 `specification.md`，確認包含 A1-A6, B1-B4 等作業規格要求。

### 階段二：資料庫設計與初始化
*   **數據整理**：將 87-114 年的豬肉歷史價格整理至 `pork_data.json`。
*   **資料庫邏輯 (`database.js`)**：
    *   實作每次啟動自動「刪除舊表並重建」的邏輯，確保資料純淨度。
    *   讀取 `pork_data.json` 並批量寫入 SQLite `pork_prices` 資料表。
*   **整合掛載**：在 `app.js` 中調用 `initDb()` 確保伺服器運行前資料庫已就緒。

### 階段三：後端 API 開發 (`routes/index.js`)
*   **GET `/api/prices`**：從資料庫撈取所有資料，並依年份升序排列回傳。
*   **POST `/api/prices`**：實作「新增或更新」功能，支援輸入新數據後同步存進資料庫。

### 階段四：前端介面開發與美化
*   **HTML 結構**：建立包含 Banner、輸入表單、Canvas 圖表區與數據表格的佈局。
*   **CSS 視覺化**：
    *   實作 **Hero Banner** 效果，圖片上方覆蓋半透明遮罩與標題。
    *   使用 `object-fit: cover` 與 `filter: brightness` 提升網頁美感。
*   **JS 邏輯 (`main.js`)**：
    *   透過 `fetch` 串接後端 API。
    *   利用 **Chart.js** 繪製動態折線圖，並配置 Tooltip 顯示年份與單價。
    *   實作表格渲染與表單提交後的即時更新功能。

### 階段五：驗證與文件化
*   **功能測試**：確認重啟程式後數據會回到初始狀態。
*   **README 撰寫**：提供完整的安裝指令、目錄結構說明與使用指南。

## 3. 關鍵程式碼片段說明

### 後端：資料庫初始化邏輯 (database.js)
```javascript
db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS pork_prices`); // 確保重啟即重置
    db.run(`CREATE TABLE pork_prices (...)`);
    // 批次插入初始 json 數據
});
```

### 前端：Chart.js 渲染 (main.js)
```javascript
const porkChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [...] },
    options: { /* 設定 Tooltip 與 Y 軸標籤 */ }
});
```

## 4. 結語
本實作完整達成了作業要求的 B/S 架構設計，並透過 SQLite 確保了資料的持久化（運行期間）與初始化（啟動時）。視覺效果上透過 Hero Banner 提供了良好的使用者體驗。
