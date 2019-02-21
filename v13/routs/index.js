


var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var user    = require("../models/user");



// root routs
router.get("/",
    (request, res) => {
        res.render("landing");
});

// register form ROUTE
router.get("/register",
    (req, res) => {
        res.render("register");
});

//handling sign up rout
router.post("/register",
    (req,res) => {
        // req.body.username
        // req.body.password
        let newUser = new user({username: req.body.username});
        user.register(newUser,
            req.body.password,
                (err, usr) => {
                    if(err){
                        req.flash("error",
                            err.name,
                            err.message
                        );
                        return res.render("register");
                    }
                    passport.authenticate("local")(req, res,
                        () => {
                            req.flash("success",
                                "Welcome to Tlake Of The Town"
                                + user.username
                                );
                            res.redirect("/talkOfTheTown");
                });
        });
});


// LOGIN ROUT 
router.get("/login",
    (req,res) => {
        res.render('login');
});

//login logic magic
//middleware
router.post("/login",
    passport.authenticate("local",
        {
        successRedirect: "/talkOfTheTown",
        failureRedirect: "/login"
    }),
    (req, res) => {
});

//logout rout
router.get("/logout",
(req,res) => {
    req.logout();
    req.flash("success",
        "logged you out");
    res.redirect("/");
});


//middlewear 
// function isLoggedIn (req, res, nxt){
//     if(req.isAuthenticated()){
//         return nxt();
//     }
//     res.redirect("/login");
// }
///////moved by refactoring 

module.exports= router;