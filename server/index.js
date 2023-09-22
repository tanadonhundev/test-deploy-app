const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./configs/database");

//const mainRoutes = require("./routes/mainRoutes");
const shorturl = require("./routes/shorturl");

connectDB();

// Middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
//app.use("/", mainRoutes);
app.use("/", shorturl);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));