

var express     = require("express");
var router      = express.Router();
var Tott        = require("../models/tott");



router.get("/talkOfTheTown", (req, res) => {
    // console.log("rumors");
    // res.render("tott", {rum: rumors});

    // get all totts and display them 
    Tott.find({}, (err, allTotts) => {
        if(err){
            console.log(err);
        }
        else {
            res.render("tott/index", {rum: allTotts, currentUser: req.user});
        }
    });
});


router.post("/talkOfTheTown", (req, res) => {
    // get data from form and add to rumors array
    let name = req.body.name;
    let bodyOfRumor = req.body.body;
    let media = req.body.image;
    let newRumor = {class: name, rumor: bodyOfRumor, media: media};
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


router.get("/talkOfTheTown/new", (req, res) => {
    res.render("tott/new");
});


router.get("/talkOfTheTown/:id", (req, res) => {
    Tott.findById(req.params.id).populate("comments").exec((err, foundRumor) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("tott/show", {Tott: foundRumor});
        }
    });
});

module.exports= router;