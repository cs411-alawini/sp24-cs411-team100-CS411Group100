const express = require('express')
const authController= require("../controllers/authController")
const employeeController= require("../controllers/employeeController")

var router = express.Router();

router.get('/', authController.isAuthenticated, employeeController.get)

module.exports = router;