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
const app = express();
require("./lib/passport");
app.set("port", process.env.PORT || 3000);

// vistas
app.engine("ejs", require("express-ejs-extend"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// configuraciones
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());
app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});
// rutas
app.use(require("./routes/authentication"));
app.use("/views", require("./routes/views"));
app.use("/req", require("./routes/req"));
app.use("/post", require("./routes/post"));
app.use("/delete", require("./routes/delete"));
app.use("/edit", require("./routes/edit"));
// public
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).render("./error");
});

app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});
