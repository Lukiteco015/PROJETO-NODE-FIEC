const Answer = require('../models/answerModel');
const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel')

// Função para criar uma nova resposta

exports.createAnswer = async (req, res) => {
    try {
        const { feedbackId, userId, answer } = req.body;

        // Busca feedback e usuário
        const feedback = await Feedback.findOne({ _id: feedbackId });
        const user = await User.findOne({ _id: userId });

        // Verificação de existência
        if (!feedback || !user) {
            return res.status(404).json({ error: "Usuário ou Feedback não existe!" });
        }

        // Criação da nova resposta
        const newAnswer = new Answer({
            feedbackId,
            userId,
            answer
        });

        await newAnswer.save();

        // Atualiza o array de respostas no feedback
        await feedback.updateOne({ $push: { answers: newAnswer._id } });

        // Se for ADMIN, atualiza o status do feedback
        if (user.role === 'ADMIN') {
            await feedback.updateOne({ $set: { status: 'RESPONDIDO' } });
        }

        // Retorna a resposta criada
        return res.status(201).json(newAnswer);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar a resposta', error: error.message });
    }
};


// Função para buscar todas as respostas de um feedback específico
exports.getAnswersByFeedbackId = async (req, res) => {
    try {
        const { feedbackId } = req.params;

        const answers = await Answer.find({ feedbackId })
            .populate('feedbackId');  // Preenche as referências feedbackId e userId

        if (answers.length === 0) {  // Corrigido: verifica se o array de respostas está vazio
            return res.status(404).json({ message: 'Nenhuma resposta encontrada para este feedback' });
        }

        return res.status(200).json(answers);  // Retorna as respostas encontradas com status 200
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar respostas', error: error.message });
    }
};

// Função para deletar uma resposta pelo ID
exports.deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAnswer = await Answer.findByIdAndDelete(id);  // Deleta a resposta pelo ID

        if (!deletedAnswer) {
            return res.status(404).json({ message: 'Resposta não encontrada para deletar' });
        }

        return res.status(200).json({ message: 'Resposta deletada com sucesso' });  // Retorna sucesso
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar resposta', error: error.message });
    }
};

// Função para atualizar uma resposta pelo ID
exports.updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        const updatedAnswer = await Answer.findByIdAndUpdate(id, { answer: answer }, { new: true });  // Atualiza a resposta

        if (!updatedAnswer) {
            return res.status(404).json({ message: 'Resposta não encontrada para atualizar' });
        }

        return res.status(200).json(updatedAnswer);  // Retorna a resposta atualizada
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar a resposta', error: error.message });
    }
};
