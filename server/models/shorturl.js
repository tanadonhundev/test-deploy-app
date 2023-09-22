const mongoose = require("mongoose");

const shorturlScheme = mongoose.Schema({
    fullurl: String,
    shorturl: String,
    clicks: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Shorturl", shorturlScheme);