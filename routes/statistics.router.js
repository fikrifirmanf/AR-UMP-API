const express = require('express')
const router = express.Router()
const StatisticsController = require('../controllers/statistics.controller')

router.get("/", StatisticsController.getAllStat);


module.exports = router