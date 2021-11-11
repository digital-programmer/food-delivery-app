const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');

// Database connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Error conecting to MongoDB"));
connection.once("open", () => {
    console.log("Connected to database :: MongoDB");
})

// assets
app.use(express.static("public"));

// Set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs");

require('./routes/web')(app);

app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
});

