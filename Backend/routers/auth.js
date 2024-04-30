const express = require('express')
const authController= require("../controllers/authController")

var router = express.Router();


router.post('/token', authController.authenticateUser)
router.post('/employeeToken', authController.authenticateEmployee)
router.get('/verify', authController.isAuthenticated, authController.nextreq)

module.exports = router;