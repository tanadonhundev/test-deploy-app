// controllers/mainController.js
const Shorturl = require("../models/shorturl");
const shortId = require("shortid");

async function getMainData(req, res, next) {
    try {
        const url = await Shorturl.find({}).exec();
        res.send(url);
    } catch (error) {
        console.log(error);
        res.send('Server Error');
    }
}

module.exports = {
    getMainData,
};
