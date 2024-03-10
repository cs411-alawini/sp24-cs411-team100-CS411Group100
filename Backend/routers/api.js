const express = require('express')
const healthChecker = require('../healthChecker')

var router = express.Router();

router.get('/health', healthChecker.checkStatus)

module.exports = router;