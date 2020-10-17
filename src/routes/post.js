const express = require("express");
const router = express.Router();
const pool = require("../database");

const app = express();
// proveedores
router.post("/proveedores", async (req, res) => {
  const { nombre, telefono, correo } = req.body;
  const proveedor = { nombre, telefono, correo, user_id: req.user.id };
  const addProveedor = await pool.query(" insert into proveedores set ?", [
    proveedor,
  ]);
  res.json(addProveedor);
});
// proveedores
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
// piezas ---->
router.post("/piezas/add", async (req, res) => {
  const {
    nombre_pieza,
    pieza_equipo_id,
    detalles,
    subsistema,
    funcionamiento,
    medidas,
    codificacion,
  } = req.body;
  const pieza = {
    nombre_pieza,
    pieza_equipo_id,
    detalles,
    subsistema,
    funcionamiento,
    medidas,
    codificacion,
  };
  const addpieza = await pool.query("insert into piezas set ?", [pieza]);

  res.json(addpieza);
});
// <-----piezas
// post
router.post("/mantenimiento/add/", async (req, res) => {
  const { tipo, descripcion, frecuencia, piezas_id, equipo_id } = req.body;
  const mantenimiento = {
    tipo,
    descripcion,
    // personal,
    frecuencia,
    piezas_id,
    equipo_id,
  };

  try {
    const addmantience = await pool.query(
      "INSERT INTO  mantenimiento_piezas SET ?",
      [mantenimiento]
    );
    res.json(addmantience);
  } catch (error) {
    console.log(error);
    res.send({
      msg: "XDXD",
    });
  }
});
// post
module.exports = router;
app;
