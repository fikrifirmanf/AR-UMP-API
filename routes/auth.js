const express = require('express')
const userController = require('../controllers/users.controller')
const router = express.Router()
const bodyparser = require('body-parser')

const urlEncodeParser = bodyparser.urlencoded({
    extended: false
})
router.post('/', urlEncodeParser, userController.authenticate)

module.exports = router;