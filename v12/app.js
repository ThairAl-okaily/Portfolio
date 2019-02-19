var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStratigy= require("passport-local"),
    passportLM    = require("passport-local-mongoose"),
    expressSession   = require("express-session"),
    mOverride   = require("method-override"),
    flash       = require("connect-flash");




app.use(flash());

// requiring Routs 
let commentsRoute = require("./routs/comments");
let tottRoute = require("./routs/tott");
let authRoute = require("./routs/index");



const Tott = require("./models/tott");
const Comment = require("./models/comment");

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(mOverride("_method"));




// // let seedModel = require("./seeds");
// function seedDB() { 
//     var data = [
//         {
//             class: "Cloud's Rest", 
//             image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//             rumor: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//         },
//         {
//             class: "Desert Mesa", 
//             image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//             rumor: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//         },
//         {
//             class: "Canyon Floor", 
//             image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//             rumor: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//         }
//     ];

// //remove all campgrounds 
//     Tott.deleteMany({}, function (er) {
//        if (er) {
//            console.log(er);
//        }
//             console.log("DB removed!!");
// //add a few talks 
//         data.forEach(seed => {
//             Tott.create(seed, (err, e) => {
//                 if(err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log("added talk");
// //add a few comments 
//                     Comment.create(
//                         {
//                             text: "this place is great, i did not know it before",
//                             auther: "harry"
//                         }, (error, comment) => {
//                             if(error) {
//                                 console.log(error);
//                             }
//                             else {
//                                 e.comments.push(comment);
//                                 e.save();
//                                 console.log("added comment");
//                             }  
//                         });
//                 }
//             });
//         });
//     });
//    }
// // call seedDB func
// seedDB();

  




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

var user = require("./models/user");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "shamles i will walk amoge them",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, nxt) { 
    res.locals.currentUser = req.user;
    nxt();
 });

passport.use(new localStratigy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());








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



app.use("/talkOfTheTown/:id/comments", commentsRoute);
app.use("/talkOfTheTown", tottRoute);
app.use("/", authRoute);


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

