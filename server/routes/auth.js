const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')


//http://localhost:5000/api/register
router.post("/register", auth.registerUser);

router.post("/login", auth.loginUser);


module.exports = router;