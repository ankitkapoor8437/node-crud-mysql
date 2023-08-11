const express = require("express");
const app = express();
const connection = require('./config/db')
const dotenv = require("dotenv")
dotenv.config();


const PORT = process.env.PORT;


app.get("/", (req, res) => {
    res.send("Server is running!")
})

app.listen(PORT || 4000 || 5000, (error) => {
    if (error)
        throw error;
    console.log(`Server is running on PORT ${PORT}`)
});


