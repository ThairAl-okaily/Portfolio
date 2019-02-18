
var Tott = require("../models/tott");
var comment = require("../models/comment");
// all the middle ware going here 

let middlewareObj = {};

// check talk authorization
middlewareObj.checkTalkOwnership = (req, res, next) => { ;
    if(req.isAuthenticated()){
        Tott.findById(req.params.id, (er, foundTott) => {
            if(er) {
                res.redirect("back");
            }
            else {
                if(foundTott.auther.id.equals(req.user._id)){
                next();
                }else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }


//check comment autorization
middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Tott.findById(req.params.comment_id, (er, foundComment) => {
            if(er) {
                res.redirect("back");
            }
            else {
                if(foundComment.auther.id.equals(req.user._id)){
                   next();
                }else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

// middle wear
middlewareObj.isLoggedIn = (req, res, nxt) => {
    if(req.isAuthenticated()){
        return nxt();
    }
    else {
    res.redirect("/login");
    }
}


module.exports = middlewareObj;