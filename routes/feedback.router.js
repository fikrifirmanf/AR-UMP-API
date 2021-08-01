const express = require('express')
const router = express.Router()
const FeedbackController = require('../controllers/feedback.controller')

router.get('/',FeedbackController.getAll);
router.get('/:id',FeedbackController.getById);
router.get('/type/:id',FeedbackController.getByType);
router.post('/',FeedbackController.create);
router.patch('/:id',FeedbackController.update);
router.delete('/:id',FeedbackController.delete);

module.exports = router