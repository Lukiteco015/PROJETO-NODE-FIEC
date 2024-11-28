const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    feedbackDateTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pendente', 'Respondido'],
        required: true,
    },
    score: {
        type: Number,
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
>>>>>>> 1e8c247e4c5d8265d8208d96e356940425fd7b46
});

module.exports = mongoose.model('Feedback', feedbackSchema);
