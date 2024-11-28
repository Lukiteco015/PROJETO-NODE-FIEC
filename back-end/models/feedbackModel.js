const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    feedbackDateTime: { type: Date, default: Date.now },
    status: { type: String, default: 'Pendente' },
    score: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    responses: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            response: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Feedback', feedbackSchema);
