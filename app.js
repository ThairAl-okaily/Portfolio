var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (request, res) => {
    res.render("landing");
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

