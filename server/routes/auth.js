const express = require("express");
const route = express.Router();

const { registerUser, loginUser, currenUser } = require("../controllers/auth");



//http://localhost:5000/api/register
route.post("/register", registerUser);

route.post("/login", loginUser);


module.exports = route;