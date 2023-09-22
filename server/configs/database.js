const mongoose = require("mongoose");

//"mongodb+srv://thanadev:1234@cluster0.z6ys8ya.mongodb.net/ShortURL"
const url = process.env.DATABASE;
const connectDB = async () => {
    try {
        await mongoose.connect(url);

        console.log("DB Connecte")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;