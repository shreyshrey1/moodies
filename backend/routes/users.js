var express = require('express');
var router = express.Router();
var { export_data } = require("../utils")
const sqlite3 = require("sqlite3").verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/gettexts', (req, res, next) => {
  const db = new sqlite3.Database('./chat.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to chat database");
  })
  let sql = `SELECT text text,
              date date
              FROM message`
  return db.all(sql, [], async(err, rows) => {
      let text_sentiment = await export_data(rows);
      res.send(text_sentiment);
  })
})

module.exports = router;
