const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("this is home");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});