const express = require("express");
const router = express.Router();
const pool = require("../database");

const app = express();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM lista_maquinas WHERE  ID= ?", [id]);
  //   req.flash("success", "Equipo Borrado");
  req.flash("success", "borrado");
  res.redirect("/views/maquinas");
});
module.exports = router;
app;
