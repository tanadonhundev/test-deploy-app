// routes/shorturlRoutes.js
const express = require('express');
const router = express.Router();
const shorturlController = require('../controllers/shorturl');

// Define routes and their associated controller functions
router.get("/", shorturlController.getAllShortUrls);

module.exports = router;
