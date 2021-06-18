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
    secret:"fashion",
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
    console.log('o' ,req.body, 'ok')
    User.register(new User({username:req.body.username}),req.body.password, function(err,user){
        if(err){
           return  res.redirect("/register")
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
    failureRedirect:"/login"
   })
)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/")
    }
}

app.listen(8080, ()=>{
    console.log("todos app is running...")
})