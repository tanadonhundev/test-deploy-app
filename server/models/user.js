const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: Number,
    },
    email: String,
    password: String,
    role: String,
    enabled: {
        type: Boolean,
        default: 'true'
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userScheme);