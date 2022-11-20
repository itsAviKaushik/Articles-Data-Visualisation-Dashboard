const mongoose = require("mongoose");

async function dbConnect() {
    await mongoose.connect("mongodb://localhost:27017/BlackCoffer");

    console.log("Database Connected!");
}

module.exports = dbConnect;