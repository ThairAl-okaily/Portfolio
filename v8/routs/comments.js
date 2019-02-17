


var express     = require("express");
var router      = express.Router({mergeParams: true});
var Tott = require("../models/tott");
var comment = require("../models/comment");
var user = require("../models/user");


// comments new 
router.get("/new", isLoggedIn, (req, res) => {
    Tott.findById(req.params.id, (err, tott) => {
        if(err) {
             console.log(err);
        }
        else {
            // res.render("new.ejs");
             res.render("comments/new", {tott: tott});
        }
    });
});

// comments creat
router.post("/", isLoggedIn, function (req, res) {
    Tott.findById(req.params.id, (err, tott) => {
        if(err) {
            console.log(err);
            res.redirect("/tott");
        }
        else {
            comment.create(req.body.comments, function (er, com) {
                if(er) {
                    console.log(er);
                } 
                else {
                    // add user name and id to comments
                    com.auther.id = req.user._id;
                    com.auther.username = req.user.username;
                    //save comment
                    com.save();
                    tott.comments.push(com);
                    tott.save();
                    res.redirect("/talkOfTheTown/" + tott._id );
                }
            });
        }
    });
});


//middle wear
function isLoggedIn (req, res, nxt){
    if(req.isAuthenticated()){
        return nxt();
    }
    else {
    res.redirect("/login");
    }
}


module.exports= router;