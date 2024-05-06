const express = require('express')
const authController= require("../controllers/authController")
const accountController= require("../controllers/accountController")

var router = express.Router();

router.get('/', authController.isAuthenticated, accountController.getAccounts)
router.get('/:accountId', authController.isAuthenticated, accountController.getAccountByID)
router.post('/', authController.isAuthenticated, accountController.createAccount)
router.put('/:accountId', authController.isAuthenticated, accountController.updateAccount)
router.delete('/:accountId', authController.isAuthenticated, accountController.deleteAccount)

module.exports = router;