

var express     = require("express");
var router      = express.Router();
var Tott        = require("../models/tott");
var comment = require("../models/comment");



//index rout // show all totts
router.get("/", (req, res) => {
    // console.log("rumors");
    // res.render("tott", {rum: rumors});

    // get all totts and display them 
    Tott.find({}, (err, allTotts) => {
        if(err){
            console.log(err);
        }
        else {
            res.render("tott/index", {rum: allTotts});
        }
    });
});

//CREAT - add new talk
router.post("/", isLoggedIn, (req, res) => {
    // get data from form and add to rumors array
    let name = req.body.name;
    let bodyOfRumor = req.body.body;
    let media = req.body.image;
    //get and link user name to created talk 
    let auther = {
        id: req.user._id,
        username: req.user.username
    };
    let newRumor = {class: name, rumor: bodyOfRumor, media: media, auther: auther};

    // rumors.push(newRumor);
    Tott.create(newRumor, (err, newlyRumor) => {
        if(err){
            console.log(err);
        }
        else {
                //redirect back to talk of the town page
                res.redirect("/talkOfTheTown");
        }
    });
    //great new rumor and add to totts


});

//NEW - show form to creat new talk
router.get("/new", isLoggedIn, (req, res) => {
    res.render("tott/new");
});


//SHOW - show exact talk info 
router.get("/:id", (req, res) => {
    Tott.findById(req.params.id).populate("comments").exec((err, foundRumor) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("tott/show", {Tott: foundRumor});
        }
    });
});

// EDIT TALKE ROUTE
router.get("/:id/edit", checkTalkOwnership, (req, res) => {
    Tott.findById(req.params.id, (er, foundTott) => {
    res.render("tott/edit", {tott: foundTott});
    });
});

// UPDATE TALK ROUTE
router.put("/:id", checkTalkOwnership, (req, res) =>{
    Tott.findByIdAndUpdate(req.params.id, req.body.tott, (err, updatedTalk) => {
        if(err) {
            res.redirect("/talkOfTheTown");
        }
        else {
            res.redirect("/talkOfTheTown/" + req.params.id);
        }
    });
});

// DESTROY TALK ROUTE 
router.delete("/:id", checkTalkOwnership, (req, res) =>{
   Tott.findByIdAndRemove(req.params.id, (er, tot) => {
        if(er) {
            res.redirect("/talkOfTheTown");
        }
        else {
            comment.deleteMany({_id: {$in: tot.comments}}, err => {
                if(err) {
                    console.log(err);
                }
                res.redirect("/talkOfTheTown");
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

function checkTalkOwnership (req, res, next) {
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
}

module.exports= router;