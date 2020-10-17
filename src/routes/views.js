const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

const app = express();
// init mantience
router.get("/mantenimiento", (req, res) => {
  res.render("mantenimiento");
});
// init mantience
router.get("/productos", isLoggedIn, (req, res) => {
  res.render("productos", { title: "Productos" });
});
router.get("/herramientas", isLoggedIn, (req, res) => {
  res.render("herramientas", { title: "herramientas" });
});
router.get("/maquinas", isLoggedIn, (req, res) => {
  res.render("maquinas", { title: "equipos" });
});
router.get("/maquinas/piezas/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const equipo = await pool.query(
    "select equipo from lista_maquinas where id = ? ",
    [id]
  );
  console.log(equipo);
  res.render("piezas2", { id, equipo });
});
router.get("/proveedores/", isLoggedIn, (req, res) => {
  res.render("proveedores", { title: "proveedores" });
});
module.exports = router;
app;
