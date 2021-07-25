const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const todoRoutes = require("./routes/todos")
const db = require("./models")
const expressSession = require('express-session')
const dotenv = require("dotenv").config()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false 
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// app.use(function(req,res,next){
//     next()
// })
app.use('/api/todos', todoRoutes)


//routes
app.get("/", (req,res)=>{

 res.render("home")
})
app.get("/register", (req,res)=>{
    res.render('register')
})
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password, function(err,user){
        if(err){
            console.log(err.message)

            res.redirect("/register", )
           
        }
        passport.authenticate("local")(req,res,function(){
             res.redirect('/index');
            })

    })
})
app.get("/index", isLoggedIn, (req,res)=>{
    res.render('index')
})

app.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/"
   })
)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/")
    }
}

let port =  process.env.PORT || 8080
app.listen(port ,()=>{
    console.log("todos app is running...")
})