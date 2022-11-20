const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    end_year: {
        type: String | Number
    },
    intensity: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    insight: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    region: String,
    start_year: {
        type: String | Number
    },
    impact: {
        type: String | Number
    },
    added: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true
    },
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: String,
});

module.exports= mongoose.model("data", schema);