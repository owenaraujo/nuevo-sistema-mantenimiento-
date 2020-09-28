const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

const app = express();

router.get("/productos", isLoggedIn, (req, res) => {
  res.render("productos", { title: "Productos" });
});
router.get("/herramientas", isLoggedIn, (req, res) => {
  res.render("herramientas", { title: "herramientas" });
});
router.get("/maquinas", isLoggedIn, (req, res) => {
  res.render("maquinas", { title: "equipos" });
});

module.exports = router;
app;
