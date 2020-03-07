const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

let db = require("./db/db.json");
// let load = document.getElementById("load")
// load.onclick = function(){
//     window.location.reload();
// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));
//makes localhost look in the public folder

app.get("/api/notes", function (req, res) {
    res.json(db);
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});





app.post("/api/notes", function(req, res) {
    var newdb = req.body;
    //console.log(db);
    db.push(req.body)
    req.body.id = db.length;
    res.json(db)
    });

  //delete new note:
  app.delete("/api/notes/:id",function(req,res)  {
    var chosen = parseInt(req.params.id);
    for (var i = 0; i < db.length; i++) {
        if (chosen === db[i].id) {
            db.splice(i, 1);
        }
        for (let i = 0; i < db.length; i++) {
            db[i].id = 1 + i;
        }
    }
     fs.writeFile("./db/db.json", JSON.stringify(db), 'utf8',function(err) {
        if (err) {
            throw err;
        }
    })
    return res.json(false);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
  



    app.listen(PORT, function () {
        console.log("App listening on PORT" + PORT);

    });