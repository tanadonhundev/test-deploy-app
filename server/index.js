const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./configs/database");

const { readdirSync } = require("fs");

const app = express();

const port = process.env.PORT||5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

//route
readdirSync('./routes')
    .map((r) => app.use("/", require("./routes/" + r)));

app.listen(port, () => console.log('Server Running on Port ' + port))