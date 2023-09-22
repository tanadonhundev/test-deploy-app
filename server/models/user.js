const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", userScheme);