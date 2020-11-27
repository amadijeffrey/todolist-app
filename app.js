const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const todoRoutes = require("./routes/todos")
const db = require("./models")


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use("/api/todos", todoRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.get("/", (req,res)=>{

 res.render("index")
})

app.listen(8080, ()=>{
    console.log("todos app is running...")
})