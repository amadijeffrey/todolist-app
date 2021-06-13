const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const todoRoutes = require("./routes/todos")
const db = require("./models")


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.get("/", (req,res)=>{

 res.render("home")
})
app.get("/register", (req,res)=>{
    res.render('register')
})
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password, function(err,user){
        if(err){
           return  res.redirect("/register")
        }
        passport.authenticate("local")(req,res,function(){
             res.redirect('/index');
            })

    })
})
app.get("/index", (req,res)=>{
    res.render('index')
})

app.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/login"
   })
)

app.listen(8080, ()=>{
    console.log("todos app is running...")
})