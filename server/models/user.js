const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userScheme);