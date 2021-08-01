const express = require('express')
const BuildingRouter = require('./building.router')
const UsersRouter = require('./users.router')
const StatisticsRouter = require('./statistics.router')
const FeedbackRouter = require('./feedback.router')
const router = express.Router()

router.use('/users', UsersRouter)
router.use('/building', BuildingRouter)
router.use('/statistics', StatisticsRouter)
router.use('/feedback', FeedbackRouter)

module.exports = router;