const feedbackService = require('../services/feedbackService')

exports.createFeedback = async(req, res) => {
    try {
        const { title, content } = req.body
        const userId = req.userId // Obtém o userId do token JWT

        const feedback = await feedbackService.createFeedback(userId, title, content)

        res.status(201).json({
            message: "Feedback criado com sucesso!",
            feedback
        })
    } catch(err) {
        res.status(400).json()
    }
}

// const respondToFeedback = async(req, res) => {
//     try {
//         const { feedbackId, response} = req.body
//         const adminId = req.userId // O adminId vem do token JWT

//         const feedback = await feedbackService.respondToFeedback(feedbackId, response, adminId)
//         res.status(200).json({
            
//         })
//     }
// }