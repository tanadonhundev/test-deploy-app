const Shorturl = require("../models/shorturl");
const shortId = require("shortid");

exports.createUrl = async (req, res) => {
    try {
        const { fullurl } = req.body;
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
};


exports.listUrl = async (req, res) => {
    try {
        const url = await Shorturl.find({}).exec();
        res.send(url);
    } catch (error) {
        console.log(error);
        res.send('Server Error');
    }
}

exports.clicksUrl = async (req, res) => {
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
};
exports.removeUrl = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const removed = await Shorturl.findOneAndDelete({ _id: id }).exec()
        res.send("ลบ URL สำเร็จแล้ว");
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}