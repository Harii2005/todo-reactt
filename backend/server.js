const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;
const User = require('./Models/User');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');

const sessionOptions = {
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
        maxAge: 1000 * 60 * 60 * 24 * 7, // Also 7 days
        httpOnly: true,
    }
}


app.use(express.urlencoded({extended : true}));

app.use(passport.initialize());
app.use(session(sessionOptions));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.listen(port , () => {
    console.log(`listing to port : ${port}`);
    mongoose.connect(URL);
    console.log("DB conncted");
})
app.get('/' , (req , res) => {
    res.send('home route');
});