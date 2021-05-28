const express = require('express')
const router = express.Router()
const BuildingController = require('../controllers/builidng.controller')

router.get('/',BuildingController.getAll);
router.get('/:id',BuildingController.getById);
router.post('/',BuildingController.create);
router.patch('/:id',BuildingController.update);
router.delete('/:id',BuildingController.delete);

module.exports = router