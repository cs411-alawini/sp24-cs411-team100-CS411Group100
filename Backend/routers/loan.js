const express = require('express')
const authController= require("../controllers/authController")
const loanController= require("../controllers/loanController")

var router = express.Router();

router.get('/:accountId', authController.isAuthenticated, loanController.getLoansByAccountID)
router.get('/:accountId/repaymentSchedule/:loanId', authController.isAuthenticated, loanController.getLoanRepaymentSchedule)

module.exports = router;