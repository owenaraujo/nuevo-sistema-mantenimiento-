const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/test", (req, res) => {
  res.render("test");
});

// get píezas
router.get("/get", async (req, res) => {
  const data = await pool.query("select * from  mantenimiento_piezas");
  // get piezas
  res.json(data).statusCode(200);
});

module.exports = router;
