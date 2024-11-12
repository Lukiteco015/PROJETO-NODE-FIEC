const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answerController');  // Importa o controller
const authMiddleware = require('../middleware/authMiddleware')

router.post('/answers', authMiddleware, AnswerController.createAnswer);

router.get('/answers/:feedbackId', authMiddleware, AnswerController.getAnswersByFeedbackId);

router.delete('/answers/:id', authMiddleware, AnswerController.deleteAnswer);

router.put('/answers/:id', authMiddleware, AnswerController.updateAnswer);

module.exports = router;