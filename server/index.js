// Import packages
const express = require("express");
const home = require("./routes/home");
const mainRoutes = require("./routes/mainRoutes");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);
app.use("/", mainRoutes);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));