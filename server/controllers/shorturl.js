// controllers/shorturlController.js
const Shorturl = require('../models/Shorturl'); // Import your Shorturl model

async function getAllShortUrls(req, res) {
    try {
        const urls = await Shorturl.find({}).exec();
        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = {
    getAllShortUrls,
};
