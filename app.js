var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (request, res) => {
    res.render("landing");
});

app.get("/talkOfTheTown", (req, res) => {
    console.log("rumors");

    let rumors = [
        {id: "4231423", class: "VA", level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
        {id: "4332223", class: "DC" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
        {id: "4231656", class: "CA" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
        {id: "4231677", class: "NC" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
        {id: "4231454", class: "TX" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" },
        {id: "4231232", class: "FL" , level: "0", maxLevel: "0", rumor: "sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio" }
    ];

    res.render("tott", {rum: rumors});
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

