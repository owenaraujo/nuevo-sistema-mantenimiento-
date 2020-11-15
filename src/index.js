const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const validator = require("express-validator");
const passport = require("passport");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const { database } = require("./keys");
const serv = express();
require("./lib/passport");
serv.set("port", process.env.PORT || 3000);

// vistas
serv.engine("ejs", require("express-ejs-extend"));
serv.set("views", path.join(__dirname, "views"));
serv.set("view engine", "ejs");
serv.use(express.json());
require("dotenv").config();
// configuraciones
serv.use(morgan("dev"));
serv.use(bodyParser.urlencoded({ extended: false }));
// serv.use(bodyParser.json());
serv.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
serv.use(flash());
serv.use(passport.initialize());
serv.use(passport.session());
serv.use(validator());
serv.use((req, res, next) => {
  serv.locals.message = req.flash("message");
  serv.locals.success = req.flash("success");
  serv.locals.user = req.user;
  next();
});
// rutas
serv.use(require("./routes/authentication"));

serv.use("/post", require("./routes/post"));
serv.use("/req", require("./routes/req"));

// public
serv.use(express.static(path.join(__dirname, "public")));

serv.use((req, res) => {
  res.status(404).render("error");
});

serv.listen(serv.get("port"), () => {
  console.log("Server is in port", serv.get("port"));
});
