

const mongoose = require("mongoose");


// SCHEMA SETUP
var tottSchema = new mongoose.Schema({
    class: String,
    rumor: String,
    image: String,
    location: String,
    lat: Number,
    lang: Number,
    Populirity: Number,
    createdAt: { type: Date, default: Date.now },
    auther: {
       id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username: String
    },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
});


module.exports = mongoose.model("Tott", tottSchema);