const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);

module.exports = router;
