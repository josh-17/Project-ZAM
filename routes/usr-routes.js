"use strict";
const express = require("express");
const csrfToken = require("csurf");

// Router instance
const router = express.Router();

// Default configurations
router.use((req, res, next)=>{
    res.locals.signedUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", (req, res)=>{
    const title = "Home page";
    res.render("index", {title, title});
});

router.get("/about", (req, res)=>{
    const title = "About";
    res.render("about", {title: title});
});

router.get("/contacts", (req, res)=>{
    const title = "Contacts";
    res.render("contacts", {title: title, csrfToken: csrfToken()});
});

// export module
module.exports = router;