const express = require("express");
const app = express();
const config = require("config");
const session = require("express-session");

//Form
app.use(express.urlencoded({ extended: true }));

//Session
app.set("trust proxy", 1);
app.use(session({
    secret: config.get("app.secret_key"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


//Views
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

//Static
app.use("/static", express.static(config.get("app.static")));

//Shared
app.use(require("./apps/middlewares/cart"));
app.use(require("./apps/middlewares/share"));

//Router
app.use(require(config.get("app.router")));

module.exports = app;
