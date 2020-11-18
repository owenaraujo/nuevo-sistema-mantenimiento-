const express = require("express");
const router = express.Router();
const pool = require("../database");
const app = express();
router.get("/contribuyentes/", async (req, res) => {
  const contribuyentes = await pool.query(
    "select * from contribuyentes order by rif"
  );
  res.json(contribuyentes);
});
router.get("/visitas/:id", async (req, res) => {
  const { id } = req.params;
  const visitas = await pool.query(
    `select tipo_consulta, date_format(create_at,'%d/%m/%y') AS fecha,motivo, detalles, observacion, id_contribuyente,user_id,id from visitas where id_contribuyente= ${id} order by fecha desc`
  );

  res.json(visitas);
});
router.get("/visitas/contribuyente/:id", async (req, res) => {
  const { id } = req.params;
  const contribuyentes = await pool.query(
    `select * from contribuyentes where id = ${id}`
  );

  res.json(contribuyentes);
});
// consulta estado
router.get("/estados", async (req, res) => {
  const estados = await pool.query(`select * from estados`);

  res.json(estados);
});
router.get("/estados/:id", async (req, res) => {
  const { id } = req.params;
  const estados = await pool.query(
    `select estado from estados where id_estado= ${id}`
  );

  res.json(estados);
});
// consulta estado
// consulta municipio
router.get("/municipio/:id", async (req, res) => {
  const { id } = req.params;
  const municipios = await pool.query(
    "select * from municipios where id_municipio=?",
    [id]
  );

  res.json(municipios);
});
router.get("/municipio/", async (req, res) => {
  console.log("hola");
});
router.get("/municipios/:id", async (req, res) => {
  const { id } = req.params;
  const municipios = await pool.query(
    "select * from municipios where id_estado=?",
    [id]
  );

  res.json(municipios);
});
router.get("/visitas/municipios/:id", async (req, res) => {
  const { id } = req.params;
  const municipios = await pool.query(
    `select * from municipios where id_municipio= ${id}`
  );

  res.json(municipios);
});
// consulta municipio
// consulta parroquia
router.get("/parroquia/:id", async (req, res) => {
  const { id } = req.params;
  const parroquia = await pool.query(
    `select * from parroquias where id_municipio=?`,
    [id]
  );

  res.json(parroquia);
});
router.get("/visitas/parroquia/:id", async (req, res) => {
  const { id } = req.params;
  const parroquias = await pool.query(
    `select * from parroquias where id_parroquia=?`,
    [id]
  );

  res.json(parroquias);
});

// consulta parroquia
// search contribuyente
router.get("/searchContribuyente/:data", async (req, res) => {
  const { data } = req.params;
  const search = await pool.query(
    `select * from contribuyentes where rif LIKE '%${data}%' or contribuyente like '${data}%'`
  );

  res.json(search);
});
// search contribuyente
module.exports = router;
app;
