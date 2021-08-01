const express = require('express')
const app = express()
const passport = require('passport')
const User = require('../models/user')


app.get("/", (req, res) => {

    res.render("home")
})-

app.get("/register", (req, res) => {
    res.render('register')
})

app.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("/register",)

        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", `Welcome${user.name}`)
            res.redirect('/index')

        })

    })
})
app.get("/index", isLoggedIn, (req, res) => {
    res.render('index')
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/"
})
)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/")
    }
}

module.exports = app