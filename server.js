require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');


// Database connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Error conecting to MongoDB"));
connection.once("open", () => {
    console.log("Connected to database :: MongoDB");
})

// Session store
const mongoStore = MongoDbStore.create({
    mongoUrl: url,
    client: connection.getClient(),

}, (err) => {
    console.log("connect-mongodb setup not ok");
    console.log(err);
});

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: mongoStore,
}))

app.use(flash());

// assets
app.use(express.static("public"));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})


// Set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs");

require('./routes/web')(app);

app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
});