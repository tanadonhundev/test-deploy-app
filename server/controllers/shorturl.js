const Shorturl = require("../models/shorturl");
const shortId = require("shortid");

async function createUrl(req, res, next) {
    try {
        const {fullurl} = req.body;
        const shortUrl = "https://shorturl.at/" + shortId.generate()
        //CheckURL
        var url = await Shorturl.findOne({ fullurl });

        if (url) {
            return res.send("มี URL ในระบบแล้ว");
        }

        const newShortUrl = new Shorturl({
            fullurl,
            shorturl: shortUrl
        });
        //Save in Database
        await newShortUrl.save();
        res.send("Short URL สำเร็จแล้");
    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}

async function listUrl(req, res, next) {
    try {
        const url = await Shorturl.find({}).exec();
        res.send(url);
    } catch (error) {
        console.log(error);
        res.send('Server Error');
    }
}

async function clicksUrl(req, res, next) {
    try {
        const { data } = req.body;
        var url = await Shorturl.findOne({ _id: data })

        if (!url) {
            return res.json({ error: "URL not found" });
        }

        url.clicks++;

        await url.save();

    } catch (error) {
        console.error(error);
        res.send("Server Error");
    }
}

async function removeUrl(req, res, next) {
    try {
        // code
        const id = req.params.id
        const removed = await Shorturl.findOneAndDelete({ _id: id }).exec()
        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.send('Server Error')
    }
}

module.exports = {
    createUrl,
    listUrl,
    clicksUrl,
    removeUrl
};