const feedbackModel = require('../models/feedbackModel') //ctrl + espaco mostra o caminho relativo da pasta
const user = require('../models/userModel')

const createFeedback = async(userId, title, content, score, status = "Pendente", feedbackDateTime) => {
    const user = await User.findById(userId)
    if(!user) {
        throw new Error("Usuário não encontrado!")
    }

    const feedback = new feedbackModel({
        userId,
        title,
        content,
        score
    })

    await feedback.save()
    return feedback
}

module.exports = { createFeedback }