const express = require("express");
const router = express.Router();
const pool = require("../database");

const passport = require("passport");
const { isLoggedIn } = require("../lib/auth");
const { isNotLoggedIn } = require("../lib/auth");
const { query } = require("express");
const app = express();
router.post("/contribuyentes", async (req, res) => {
  const { contribuyente, rif, cuidad, estado, sede, iseniat } = req.body;
  const contribuyentes = {
    contribuyente,
    rif,
    cuidad,
    estado,
    sede,
    iseniat,
    user_id: req.user.id,
  };
  const send = await pool.query("insert into contribuyentes set ?", [
    contribuyentes,
  ]);
  res.json(send);
});
router.post("/contribuyentes/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { contribuyente, rif } = req.body;
  const send = await pool.query(
    "update  contribuyentes set contribuyente = ?, rif = ? where id= ? limit 1",
    [contribuyente, rif, id]
  );
  res.json(send);
});
module.exports = router;
app;
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const borrar = await pool.query("delete  from contribuyentes where id =?", [
    id,
  ]);
  res.json(borrar);
});
router.get("/visitas/delete/:id", async (req, res) => {
  const { id } = req.params;
  const borrar = await pool.query("delete from visitas where id =?", [id]);
  res.json(borrar);
});
router.post("/visita/", async (req, res) => {
  const {
    id_contribuyente,
    tipo_consulta,
    motivo,
    detalles,
    observacion,
  } = req.body;
  const visita = {
    id_contribuyente,
    tipo_consulta,
    motivo,
    detalles,
    observacion,
    user_id: req.user.id,
  };
  const insercion = await pool.query("insert into  visitas set ?", [visita]);
  res.json(insercion);
  console.log(detalles);
});
