const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answerController');  // Importa o controller

router.post('/answers', AnswerController.createAnswer);

router.get('/answers/:feedbackId', AnswerController.getAnswersByFeedbackId);

router.delete('/answers/:id', AnswerController.deleteAnswer);

router.put('/answers/:id', AnswerController.updateAnswer);

module.exports = router;