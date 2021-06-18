var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    password:String,
    todos:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
        }
    ]

})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema)


module.exports = User