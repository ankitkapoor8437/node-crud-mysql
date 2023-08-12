const express = require("express");
const app = express();
const connection = require('./config/db')
const dotenv = require("dotenv")
var bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT;

// Middleware used
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.redirect("/create.html")
});

//Create
app.post("/create", (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    try {
        connection.query("Insert into crud (name, email) values(?,?)", [name, email], (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                res.redirect("/data");
            }
        })
    } catch (error) {
        console.log(error);
    }
});

app.get("/data", (req, res) => {
    connection.query("Select * from crud", (error, rows) => {
        if (error) {
            console.log(error)
        }
        else {
            res.render("read.ejs", { rows });
        }
    })
})


app.listen(PORT || 4000 || 5000, (error) => {
    if (error)
        throw error;
    console.log(`Server is running on PORT ${PORT}`)
});


