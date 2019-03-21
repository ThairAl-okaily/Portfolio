

var mongoose = require("mongoose");
var passportML = require("passport-local-mongoose");
 
var commentSchema =  mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    auther: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        username: String
    }
});

commentSchema.plugin(passportML);
 
module.exports = mongoose.model("Comment", commentSchema);