const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/users.controller')

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.delete("/:id", UsersController.delete);
router.patch("/:id", UsersController.update);
router.post("/", UsersController.create);
router.get('/type/:id', UsersController.getByAgentType)
router.get('/username/:id', UsersController.getByUsername)

module.exports = router