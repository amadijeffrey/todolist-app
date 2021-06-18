const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DBURL,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connection successfull')})

mongoose.Promise = Promise 
module.exports.User = require("./user")
module.exports.Todo = require("./todo")