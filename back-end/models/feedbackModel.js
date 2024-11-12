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
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pendente', 'Respondido'],
        required: true,
        default: 'Pendente'  // O padrão será "Pendente"
    },
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Feedback",feedbackSchema);
