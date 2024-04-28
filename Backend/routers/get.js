const express = require('express')
const getController= require("../controllers/getController")

var router = express.Router();

router.get('/roles', getController.getRoles)
router.get('/districts', getController.getDistricts)
router.get('/transactionModes', getController.getTransactionModes)
router.get('/transactionTypes', getController.getTransactionTypes)
router.get('/loanTypes', getController.getLoanTypes)

module.exports = router;