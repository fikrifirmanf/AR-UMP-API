const express = require('express')
const BuildingRouter = require('./building.router')
const UsersRouter = require('./users.router')
const router = express.Router()

router.use('/users', UsersRouter)
router.use('/building', BuildingRouter)

module.exports = router;