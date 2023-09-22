const express = require('express');
const router = express.Router();
const shorturl = require('../controllers/shorturl');

router.post("/shorturl",shorturl.createUrl);
router.get("/shorturl",shorturl.listUrl);
router.post("/shorturl/clicks",shorturl.clicksUrl);
router.delete("/shorturl/:id",shorturl.removeUrl);

module.exports = router;
