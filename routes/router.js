const express = require('express')
const BuildingRouter = require('./building.router')
const UsersRouter = require('./users.router')
const StatisticsRouter = require('./statistics.router')
const router = express.Router()

router.use('/users', UsersRouter)
router.use('/building', BuildingRouter)
router.use('/statistics', StatisticsRouter)

module.exports = router;