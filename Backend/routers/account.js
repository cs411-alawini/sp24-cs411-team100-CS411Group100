const express = require('express')
const authController= require("../controllers/authController")
const accountController= require("../controllers/accountController")

var router = express.Router();

router.get('/', authController.isAuthenticated, accountController.getAccounts)

module.exports = router;