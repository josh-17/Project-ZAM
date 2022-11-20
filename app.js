"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const csrf = require("csurf");
const lusca = require("lusca");
const flash = require("connect-flash");
const http = require("http");

const adminRoutes = require("./routes/admin-routes");
const routes = require("./routes/usr-routes");


const publicPath = path.join(__dirname, "public");

const app = express();

app.use(logger("dev"));

// app configuration
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/public", express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name: "zam-project",
    secret: "zam-project-xxx-xxx-xxx-xxx",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//app.use(lusca.csp());
app.use(lusca.xframe("SAMEORIGIN"));

app.use("/admin", adminRoutes);
app.use("/", routes);

app.listen(app.get("port"), ()=>{
    console.log("Server on port"+" "+app.get("port"));
});