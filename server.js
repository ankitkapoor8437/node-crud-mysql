const express = require("express");
const app = express();
const connection = require('./config/db')
const dotenv = require("dotenv")
var bodyParser = require("body-parser");
const e = require("cors");

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

// Read 
app.get("/data", (req, res) => {
    connection.query("Select * from crud", (error, rows) => {
        if (error) {
            console.log(error)
        }
        else {
            res.render("read.ejs", { rows });
        }
    })
});

// Delete
app.get("/delete-data", (req, res) => {
    const deleteQuery = "Delete from crud where id=?";

    connection.query(deleteQuery, [req.query.id], (error, rows) => {
        if (error) {
            console.log(error)
        }
        else {
            res.redirect("/data")
        }
    })
})

// Fetch data
app.get("/update-data", (req, res) => {
    connection.query("Select * from crud where id=?", req.query.id, (error, eachRow) => {
        if (error) {
            console.log(error)
        }
        else {
            const result = JSON.parse(JSON.stringify(eachRow[0]));
            console.log(result);
            res.render("update.ejs", {result})
        }
    })
})

// Update
app.post("/final-update", (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const updateQuery = "Update crud Set name=?, email=? where id=?"
    try {
        connection.query(updateQuery, [name, email, id], (error, rows) => {
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




app.listen(PORT || 4000 || 5000, (error) => {
    if (error)
        throw error;
    console.log(`Server is running on PORT ${PORT}`)
});


