const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const analyserRoutes = require("./routes/cryptoAnalyser");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/plots", express.static("plots"));

// define routes
app.use("/", analyserRoutes);

app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port", PORT);
});

module.exports = app;
