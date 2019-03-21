

var express     = require("express");
var router      = express.Router();
var Tott        = require("../models/tott");
var comment = require("../models/comment");
var middleware = require("../middleware");
var NodeGeocoder = require("node-geocoder");


// config Google maps api 
var option = {
    provider: 'google',
    httpAdapter: 'http',
    apiKey: process.env.GEOCODER_API_KEY,
    formater: null
};
var geocoder = NodeGeocoder(option);



//index rout // show all totts
router.get("/",
    (req, res) => {
    // console.log("rumors");
    // res.render("tott", {rum: rumors});

    // get all totts and display them 
        Tott.find({},
            (err, allTotts) => {
                if(err){
                    console.log(err);
                }
                else {
                    res.render("tott/index", {rum: allTotts, page: 'talkOfTheTown'});
                }
        });
});

//CREAT - add new talk
router.post("/",
middleware.isLoggedIn,
    (req, res) => {
        // get data from form and add to rumors array
        const name = req.body.name;
        const bodyOfRumor = req.body.bodyOfRumor;
        const media = req.body.image;
        const pop = req.body.Fashionableness;
        //get and link user name to created talk 
        const auther = {
            id: req.user._id,
            username: req.user.username
        };


        geocoder.geocode(req.body.location, (err, data) => {
            if (err || !data.length) {
                req.flash('error', 'invaled address');
                return res.redirect('back');
            }
            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;
            
            const newRumor ={
                            class: name,
                            rumor: bodyOfRumor,
                            image: media,
                            popularity : pop,
                            auther: auther,
                            location: location,
                            lat: lat,
                            lng: lng
            };

                    // rumors.push(newRumor);
        Tott.create(newRumor,
                (er, newlyRumor) => {
                    if(er){
                        console.log(er);
                    }
                    else {
                        //redirect back to talk of the town page
                        res.redirect("/talkOfTheTown");
                    }
                });
        });
    //great new rumor and add to totts
});


//NEW - show form to creat new talk
router.get("/new",
middleware.isLoggedIn,
(req, res) => {
        res.render("tott/new");
    });


    //SHOW - show exact talk info 
    router.get("/:id",
    (req, res) => {
        Tott.findById(req.params.id).populate("comments").exec((err,
            foundRumor) => {
                if(err) {
                    console.log(err);
                }
                else {
                    res.render("tott/show",
                        {Tott: foundRumor});
            }
    });
});

// EDIT TALKE ROUTE
router.get("/:id/edit",
middleware.checkTalkOwnership,
(req, res) => {
        Tott.findById(req.params.id,
        (er, foundTott) => {
            res.render("tott/edit",
            {tott: foundTott});
    });
});

// UPDATE TALK ROUTE
router.put("/:id",
middleware.checkTalkOwnership,
(req, res) =>{
    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            req.flash('error', 'invaled address');
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;


        Tott.findByIdAndUpdate(req.params.id,
        req.body.tott,
        (er, updatedTalk) => {
            if(er) {
                req.flash("error", er.message);
                res.redirect("/talkOfTheTown");
            }
            else {
                req.flash("success", "Successfully Updated");
                res.redirect("/talkOfTheTown/" + req.params.id);
            }
        });
    });
});

// DESTROY TALK ROUTE 
router.delete("/:id",
middleware.checkTalkOwnership,
(req, res) =>{
   Tott.findByIdAndRemove(req.params.id,
        (er, tot) => {
            if(er) {
                res.redirect("/talkOfTheTown");
            }
            else {
                comment.deleteMany({_id: {$in: tot.comments}},
                    err => {
                        if(err) {
                            console.log(err);
                        }
                        res.redirect("/talkOfTheTown");
                });
        }
    });
});

module.exports= router;