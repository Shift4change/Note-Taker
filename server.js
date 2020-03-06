const express = require("express");
const fs = require("fs");
const path =require("path");

const app = express();

const PORT = process.env.PORT || 3000;

let db = require("./db/db.json");

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use(express.static("public"));
//makes localhost look in the public folder

app.get("/api/notes", function(req, res) {
    res.json(db);
});


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);

});