const express = require("express");
var router = express.Router();

const analyserController = require("../controllers/cryptoAnalyserController");

router.post("/getAnalysis", analyserController.analyseCoin);
router.post("/reRun", analyserController.reRun);

module.exports = router;
