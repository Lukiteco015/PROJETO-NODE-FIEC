const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');  // Importa o controller
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, answerController.createAnswer);

router.get('/:feedbackId', answerController.getAnswersByFeedbackId);

router.delete('/:id', authMiddleware, answerController.deleteAnswer);

router.put('/:id', authMiddleware, answerController.updateAnswer);

module.exports = router;