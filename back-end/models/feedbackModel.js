const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Feedback", feedbackSchema);
