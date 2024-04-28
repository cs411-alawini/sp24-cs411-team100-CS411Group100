const express = require('express')
const authController= require("../controllers/authController")
const userController= require("../controllers/userController")

var router = express.Router();

router.get('/', authController.isAuthenticated, userController.getUserByID)
router.post('/', userController.createUser)
router.put('/', authController.isAuthenticated, userController.updateUser)
router.delete('/', authController.isAuthenticated, userController.deleteUser)

module.exports = router;