const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://jeffrey:practice@cluster0.e1p5z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connection successfull')})

mongoose.Promise = Promise 
module.exports.Todo = require("./todo")