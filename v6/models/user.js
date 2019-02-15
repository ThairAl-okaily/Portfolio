const mongoose    = require("mongoose"),
passportLM    = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
    });

UserSchema.plugin(passportLM);
module.exports = mongoose.model("User", UserSchema);