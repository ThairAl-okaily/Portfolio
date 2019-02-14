var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

const Tott = require("./models/tott");
const Comment = require("./models/comment");






// let seedModel = require("./seeds");
function seedDB() { 
    var data = [
        {
            class: "Cloud's Rest", 
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            rumor: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            class: "Desert Mesa", 
            image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
            rumor: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            class: "Canyon Floor", 
            image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
            rumor: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        }
    ];

//remove all campgrounds 
    Tott.deleteMany({}, function (er) {
       if (er) {
           console.log(er);
       }
            console.log("DB removed!!");
//add a few talks 
        data.forEach(seed => {
            Tott.create(seed, (err, e) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("added talk");
//add a few comments 
                    Comment.create(
                        {
                            text: "this place is great, i did not know it before",
                            auther: "harry"
                        }, (error, comment) => {
                            if(error) {
                                console.log(error);
                            }
                            else {
                                e.comments.push(comment);
                                e.save();
                                console.log("added comment");
                            }  
                        });
                }
            });
        });
    });
   }
// call seedDB func
seedDB();

  




// let rumors = [
//     {class: "VA",  rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "DC" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "CA" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "NC" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "TX" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "FL" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "CA" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "NC" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "TX" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "CA" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "NC" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
//     class: "TX" , rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" }
// ];





// engins 
mongoose.connect("mongodb://localhost/tott", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



// // // SCHEMA SETUP
// var tottSchema = new mongoose.Schema({
//     class: String,
//     rumor: String,
//     image: String
// });

// const Tott = mongoose.model("Tott", tottSchema);

// Tott.create(
//     {
//         class: "VA",  
//         rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio",
//         image: "https://www.photosforclass.com/download/pixabay-1647328?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe833b5082bf6093ed1584d05fb1d4e97e07ee3d21cac104491f9c97ca3ecb0be_960.jpg&user=geralt"
//     }, function (err, Tott){
//         if(err){
//             console.log(err);
//         }
//         else {
//             console.log("NEWLY CREATED Tott");
//             console.log(Tott);
//         }
//     });





// routs
app.get("/", (request, res) => {
    res.render("landing");
});



app.get("/talkOfTheTown", (req, res) => {
    // console.log("rumors");
    // res.render("tott", {rum: rumors});

    // get all totts and display them 
    Tott.find({}, (err, allTotts) => {
        if(err){
            console.log(err);
        }
        else {
            res.render("index", {rum: allTotts});
        }
    });
});


app.post("/talkOfTheTown", (req, res) => {
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


app.get("/talkOfTheTown/new", (req, res) => {
    res.render("new.ejs");


});


app.get("/talkOfTheTown/:id", (req, res) => {
    Tott.findById(req.params.id, (err, foundRumor) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("show", {Tott: foundRumor});
        }
    });
});

// node server

const http = require('http');
const port = 3000;
const hostname = '127.0.0.1'; 
const server = http.createServer((request, respond) => {
respond.statusCode = 200;
respond.setHeader('Content-Type', 'text/plain');
respond.end("Hello");
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

