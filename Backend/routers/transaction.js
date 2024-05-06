const express = require('express')
const authController= require("../controllers/authController")
const transactionController= require("../controllers/transactionController")

var router = express.Router();

router.get('/:accountId', authController.isAuthenticated, transactionController.getTrasactionSummary)
router.post('/transfer', authController.isAuthenticated, transactionController.amountTransfer)

module.exports = router;