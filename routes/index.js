var express = require('express');
var router = express.Router();
var { db } = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

/* GET prices - 取得所有價格資料 */
router.get('/api/prices', function(req, res) {
  db.all("SELECT * FROM pork_prices ORDER BY year ASC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

/* POST prices - 新增價格資料 */
router.post('/api/prices', function(req, res) {
  const { year, price } = req.body;
  if (!year || !price) {
    res.status(400).json({ error: "Year and price are required" });
    return;
  }
  
  const sql = "INSERT INTO pork_prices (year, price) VALUES (?, ?) ON CONFLICT(year) DO UPDATE SET price=excluded.price";
  db.run(sql, [year, price], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, year, price });
  });
});

module.exports = router;
