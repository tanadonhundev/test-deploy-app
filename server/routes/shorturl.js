const express = require("express");
const route = express.Router();

const { createUrl, listUrl, clicksUrl, removeUrl } = require("../controllers/shorturl")

//const { auth } = require("../middleware/auth")
//http://localhost:5000/api/shorturl

route.post("/shorturl", createUrl);

route.get('/shorturl', listUrl)

route.post("/shorturl/clicks", clicksUrl);

route.delete('/shorturl/:id', removeUrl)

module.exports = route;