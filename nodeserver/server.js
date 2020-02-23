const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const fs = require('fs');


// app.use(function(req, res, next) {
//    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//    res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS, PATCH, DELETE');
//    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    res.setHeader("Access-Control-Allow-Credentials", true);
//    next();
// });

// app.options('*', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send('ok');
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
    res.send("Test");
});

app.post("/mentors", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("/mentors hit!");
    var data = fs.readFileSync("./users.json");
    var json = JSON.parse(data);
    var matchFound = false;
    for (mentor in json.mentors) {
        if (json.mentors[mentor].interest == req.body.interest) {
            res.send(json.mentors[mentor]);
            json.mentors.splice(mentor, 1);
            matchFound = true;
            break;
        }
    }
    if (!matchFound) {
        res.send("No matches!");
    }
});

app.post("/mentees", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("/mentees hit!");
    var data = fs.readFileSync("./users.json");
    var json = JSON.parse(data);
    var matchFound = false;
    for (mentee in json.mentees) {
        if (json.mentees[mentee].interest == req.body.interest) {
            res.send(json.mentee[mentee]);
            json.mentees.splice(mentee, 1);
            matchFound = true;
            break;
        }
    }
    if (!matchFound) {
        res.send("No matches!");
    }
});

app.listen(8080, () => console.log("Yay this works"));
