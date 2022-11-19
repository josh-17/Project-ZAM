const express = require("express")

// router instance 
const router = express.Router();

router.use((req, res, next)=>{
    res.locals.currentAdmin = req.admin;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});


router.get("/", (req, res)=>{
    const title = "Admin - Panel";
    res.render("admin/index", {title: title});
});

module.exports = router;