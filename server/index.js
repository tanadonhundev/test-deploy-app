const express = require("express");
const shorturlRoutes = require('./routes/shorturl');

const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./configs/database");

const { readdirSync } = require("fs");

const app = express();


connectDB();

app.use(cors());
app.use(bodyParser.json());

//route
app.use('/shorturls', shorturlRoutes);

const port = process.env.PORT||5000;
app.listen(port, () => console.log('Server Running on Port ' + port))