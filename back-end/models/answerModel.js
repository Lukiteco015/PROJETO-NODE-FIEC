const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    feedbackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },
    answerDateTime: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'Answers',
    timestamps: false,
});

module.exports = mongoose.model('Answer', AnswerSchema);