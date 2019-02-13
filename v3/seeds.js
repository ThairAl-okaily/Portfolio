
const mongoose = require("mongoose");
const Tott = require("./models/tott");


function seedDB(){
        Tott.remove({}, er => {
        if (er) {
            console.log(er);
        }
        console.log("remove all Talks");
    });
}

module.exports = seedDB;
