const express = require('express')
const BuildingRouter = require('./building.router')
const router = express.Router()

router.use('/building', BuildingRouter)

module.exports = router;