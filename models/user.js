var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    username : {
        type:String,
        validate:true
    },
    password:String,
    todos:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
        }
    ]

})

const User = mongoose.model("User", userSchema)
User.plugin(passportLocalMongoose);

module.exports = Todo