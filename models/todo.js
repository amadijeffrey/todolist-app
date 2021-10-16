var mongoose = require("mongoose")
const timeZone = require('mongoose-timezone');

const todoSchema = new mongoose.Schema({
    name : {
        type:String,
        required: "Name cannot be blank"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date : {
        type: Date,
        default: Date.now
    },
    expiryTime: Number
})
todoSchema.plugin(timeZone)
const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo
