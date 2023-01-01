const express = require("express");
var router = express.Router();

const analyserController = require("../controllers/cryptoAnalyserController");

router.post("/analyse", analyserController.analyseCoin);

module.exports = router;
