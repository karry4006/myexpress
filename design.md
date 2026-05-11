# 豬肉價格觀察站 - 專案規格書

## 1. 專案目標
建立一個 Web 應用程式，結合 Express.js 與 SQLite，展示民國 87 年至 114 年的豬肉市場拍賣價格，並提供視覺化圖表。

## 2. 功能規格 (Spec)

### A. 資料管理 (後端)
*   **數據來源**：民國 87 年至 114 年之豬肉（毛豬）歷史價格數據。
*   **自動載入**：每次程式啟動時，檢查 SQLite 資料庫，若為空則自動匯入初始數據。
*   **資料儲存**：使用 SQLite (`sqlite3`) 進行持久化儲存。
*   **Web API**：
    *   `GET /api/prices`: 讀取所有歷史價格。
    *   `POST /api/prices`: 新增價格紀錄。

### B. 使用者介面 (前端)
*   **視覺設計**：
    *   頁面標題：豬肉價格觀察站。
    *   橫幅圖片：使用 `image_de6330bc.png`。
*   **數據展現**：
    *   **表格**：名稱為「毛豬(市場拍賣價格)」，顯示年份與價格（單位：元/公斤）。
    *   **各年度折線圖**：使用 Chart.js，支援鼠標懸停顯示詳細數值。
*   **輸入功能**：提供介面讓使用者輸入新的年份與價格資料。

### C. 技術要求
*   **前端**：HTML / CSS / Vanilla JavaScript (不使用前端框架)。
*   **後端**：Node.js + Express.js。
*   **資料庫**：SQLite。
*   **通訊**：使用 fetch 進行 API 呼叫。

## 3. 欄位定義 (Database Schema)
*   `id`: INTEGER PRIMARY KEY AUTOINCREMENT
*   `year`: INTEGER (民國年)
*   `price`: DECIMAL (價格，元/公斤)
