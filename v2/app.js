var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");






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



// // SCHEMA SETUP
var tottSchema = new mongoose.Schema({
    class: String,
    rumor: String
});

const Tott = mongoose.model("Tott", tottSchema);

Tott.create(
    {
        class: "VA",  
        rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio"
    }, function (err, Tott){
        if(err){
            console.log(err);
        }
        else {
            console.log("NEWLY CREATED Tott");
            console.log(Tott);
        }
    });






// routs
app.get("/", (request, res) => {
    res.render("landing");
});

app.get("/talkOfTheTown", (req, res) => {
    console.log("rumors");



    res.render("tott", {rum: rumors});
});


app.post("/talkOfTheTown", (req, res) => {
    // get data from form and add to rumors array
    let name = req.body.name;
    let bodyOfRumor = req.body.body;
    let newRumor = {class: name, rumor: bodyOfRumor};
    rumors.push(newRumor);

    //redirect back to talk of the town page
    res.redirect("/talkOfTheTown");
});


app.get("/talkOfTheTown/new", (req, res) => {
    res.render("new.ejs");


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

