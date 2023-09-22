const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')


//http://localhost:5000/api/register
router.post("/api/register", auth.registerUser);

router.post("/api/login", auth.loginUser);


module.exports = router;