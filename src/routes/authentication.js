const express = require("express");
const router = express.Router();
const pool = require("../database");

const passport = require("passport");
const { isLoggedIn } = require("../lib/auth");
const { isNotLoggedIn } = require("../lib/auth");
const { query } = require("express");
const app = express();

// SIGNUP
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/",
    failureFlash: true,
  })
);

// SINGIN
router.get("/", isNotLoggedIn, (req, res) => {
  res.render("main", { title: "main" });
});

router.post("/signin", isNotLoggedIn, (req, res, next) => {
  req.check("username", "Por favor ingrese un usuario valido").notEmpty();
  req.check("password", "Contraseña no especificada").notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash("message", errors[0].msg);
    res.redirect("/");
  }
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const equipos = await pool.query(
    "SELECT count(*) from lista_maquinas WHERE user_id= ?",
    [req.user.id]
  );

  const equipos_0 = await pool.query(
    "SELECT count(*) from lista_maquinas WHERE user_id= ? and estado = 0",
    [req.user.id]
  );
  const registroproduct = await pool.query(
    "SELECT count(*) FROM lista_productos"
  );

  const { rol } = req.user;

  // verify is adminstrator
  if (rol == "administrador") {
    const lista_usuarios = await pool.query("SELECT * FROM usuarios");

    res.render("profile", {
      registroproduct,
      equipos,
      equipos_0,
      lista_usuarios,
      rol,
    });

    return;
  }
  console.log("no eres administrador");
  res.render("profile", { registroproduct, equipos, equipos_0 });
  console.log(equipos);
});

router.get("/profile/administracion", isLoggedIn, async (req, res) => {
  const { rol } = req.user;

  // verify is adminstrator
  if (rol == "administrador") {
    usuarios = await pool.query("SELECT * FROM usuarios");
    res.render("auth/administrador", { usuarios });
    console.log(usuarios);
    return;
  }
  console.log("no eres administrador");
  res.render("auth/autorizacion");
});
router.get("/profile/administracion/activar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("UPDATE  usuarios set estado=1 WHERE  ID= ?", [id]);
  req.flash("success", "usuario activado");

  res.redirect("/profile/administracion");
});
router.get("/profile/administracion/desactivar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("UPDATE  usuarios set estado=0 WHERE  ID= ?", [id]);
  req.flash("success", "usuario desactivado");

  res.redirect("/profile/administracion");
});

module.exports = router;
app;
