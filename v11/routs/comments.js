


var express     = require("express");
var router      = express.Router({mergeParams: true});
var Tott = require("../models/tott");
var comment = require("../models/comment");
var user = require("../models/user");
var middleware = require("../middleware");


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

//comments edit rout 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    comment.findById(req.params.comment_id, (er, foundComment) => {
        if(er) {
            res.redirect("back");
        } 
        else {
            res.render("comments/edit", {tott_id: req.params.id, comment: foundComment});
        }
    });
});

//comments update route 
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (er, updatedComment) => {
        if(er) {
            res.redirect("back");
        } 
        else {
            res.redirect("/talkOfTheTown/" + req.params.id);
        }
    });
});

//comments destroy  rout 
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    comment.findByIdAndRemove(req.params.comment_id, er => {
        if(er) {
            res.redirect("back");
        } 
        else {
            res.redirect("/talkOfTheTown/" + req.params.id);
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