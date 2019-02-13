

const mongoose = require("mongoose");


// // SCHEMA SETUP
var tottSchema = new mongoose.Schema({
    class: String,
    rumor: String,
    image: String
});

module.export = mongoose.model("Tott", tottSchema);