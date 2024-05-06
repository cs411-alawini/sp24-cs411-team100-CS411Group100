const express = require('express')
const authController= require("../controllers/authController")
const searchController= require("../controllers/searchController")

var router = express.Router();

router.get('/', authController.isAuthenticated, searchController.searchRecords)

module.exports = router;