const express = require('express')
const authController= require("../controllers/authController")
const employeeController= require("../controllers/employeeController")

var router = express.Router();

router.get('/insight', authController.isAuthenticated, employeeController.getDistrictFinancialAndCreditInsights)

module.exports = router;