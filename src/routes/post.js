const express = require("express");
const router = express.Router();
const pool = require("../database");

const app = express();
// productos ---->
router.post("/productos/", async (req, res) => {
  const {
    producto,
    codificacion,
    categoria,
    precio_menor,
    precio_mayor,
  } = req.body;
  const productos = {
    producto,
    codificacion,
    categoria,
    precio_menor,
    precio_mayor,
  };
  const addproduct = await pool.query("insert into lista_productos set ?", [
    productos,
  ]);
  // console.log(req.body);
  res.json(addproduct);
});
// <-----productos
// mquinas ---->
router.post("/maquinas", async (req, res) => {
  const {
    equipo,
    codificacion,
    tipo,
    serial,
    marca,
    modelo,
    funcionamiento,
    observaciones,
  } = req.body;
  const machines = {
    equipo,
    codificacion,
    tipo,
    serial,
    marca,
    modelo,
    funcionamiento,
    observaciones,
    user_id: req.user.id,
  };
  const addMachine = await pool.query("insert into lista_maquinas set ?", [
    machines,
  ]);
  res.json(addMachine);
  console.log(addMachine);
});
// <-----maquinas
// herramientas--->
router.post("/herramientas/", async (req, res) => {
  const { tipo, nombre, detalles, cantidad } = req.body;
  const newherramienta = {
    tipo,
    nombre,
    detalles,
    cantidad,
    user_id: req.user.id,
  };
  await pool.query("INSERT INTO herramientas set ?", [newherramienta]);
  res.json(newherramienta);
});
// <---- herramientas
module.exports = router;
app;
