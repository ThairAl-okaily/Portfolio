

var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    auther: String
});
 
module.exports = mongoose.model("Comment", commentSchema);