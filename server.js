const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
// Set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs");

require('./routes/web')(app);

app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
});

