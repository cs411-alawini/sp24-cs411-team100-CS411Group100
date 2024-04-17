const express = require('express')
const authController= require("../controllers/authController")
const userController= require("../controllers/userController")

var router = express.Router();

router.get('/', authController.isAuthenticated, userController.getUserByID)

module.exports = router;