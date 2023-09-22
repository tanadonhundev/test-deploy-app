// routes/mainRoutes.js
const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Define a route that uses the controller function
router.get("/", mainController.getMainData);

module.exports = router;
