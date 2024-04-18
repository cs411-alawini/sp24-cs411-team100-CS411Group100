const express = require('express')
const healthChecker = require('../healthChecker')
const authRouter= require("./auth")
const userRouter= require("./user")
const accountRouter= require("./account")
const transactionRouter= require("./transaction")

var router = express.Router();

router.get('/health', healthChecker.checkStatus)

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/account', accountRouter)
router.use('/transaction', transactionRouter)

module.exports = router;