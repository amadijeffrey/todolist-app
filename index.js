const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const flash = require("connect-flash")
const expressSession = require('express-session')
const dotenv = require("dotenv").config()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')

const todoRoutes = require("./routes/todos")
const authRoute = require('./routes/auth')
const User = require('./models/user')

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.json())
app.use(flash())
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false 
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/todos', todoRoutes)
app.use(function(req,res,next){
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})
app.use(authRoute)

app.get('/health', (req, res) => {
    res.send({message: 'okay'})
})



let port =  process.env.PORT || 8080
app.listen(port ,()=>{
    console.log("todos app is running...")
})

module.exports = app
