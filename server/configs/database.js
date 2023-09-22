const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.DATABASE;

//"mongodb+srv://thanadev:1234@cluster0.z6ys8ya.mongodb.net/ShortURL"
const connectDB = async () => {
    try {
        await mongoose.connect(url);

        console.log("DB Connecte")
    } catch (error) {
        console.log(error);
    }
}
process.env.PORT
module.exports = connectDB;