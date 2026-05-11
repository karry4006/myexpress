const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'prices.db');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
    db.serialize(() => {
        // 先刪除舊表，確保每次重新啟動都是乾淨的初始狀態
        db.run(`DROP TABLE IF EXISTS pork_prices`);

        // 重新建立資料表
        db.run(`CREATE TABLE IF NOT EXISTS pork_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER UNIQUE,
            price REAL
        )`);

        console.log("Database cleared, loading initial data...");
        const dataPath = path.join(__dirname, 'pork_data.json');
        const rawData = fs.readFileSync(dataPath);
        const jsonData = JSON.parse(rawData);

        const stmt = db.prepare("INSERT INTO pork_prices (year, price) VALUES (?, ?)");
        jsonData.forEach(item => {
            stmt.run(item.year, item.price);
        });
        stmt.finalize();
        console.log("Initial data loaded successfully.");
    });
};

module.exports = { db, initDb };
