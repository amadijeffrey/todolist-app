const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/todos-api")

mongoose.Promise = Promise 
module.exports.Todo = require("./todo")