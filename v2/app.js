var express = require("express");
var app = express();
var bodyParser = require("body-parser");


let rumors = [
    {id: "4231423", class: "VA", level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4332223", class: "DC" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231656", class: "CA" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231677", class: "NC" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231454", class: "TX" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231232", class: "FL" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231656", class: "CA" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231677", class: "NC" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231454", class: "TX" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231656", class: "CA" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231677", class: "NC" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
    {id: "4231454", class: "TX" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" }
];


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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

