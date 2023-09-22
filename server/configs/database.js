const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://thanadev:1234@cluster0.z6ys8ya.mongodb.net/ShortURL");

        console.log("DB Connecte")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;