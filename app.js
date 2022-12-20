// | ----------------------------------------------------------- |
// | ----------------------------------------------------------- |
// | --- Project Name :- MERN Stack Dashboard ------------------ |
// | --- Author :- Avichal Kaushik ----------------------------- |
// | --- Author Email :- avichalkaushik0007@gmail.com ---------- |
// | ----------------------------------------------------------- |
// | ----------------------------------------------------------- |

// Importing the required packages.
const path = require("path");
const express = require("express");

// Initializing our App on Express Server.
const app = express();

// Setting up middlewares.
app.use(express.json());
app.use(express.static(path.join(__dirname, "/frontend/build")));

// Setting up routes of our express app.
app.use("/api/data", require("./src/routes/data"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
})

module.exports = app;