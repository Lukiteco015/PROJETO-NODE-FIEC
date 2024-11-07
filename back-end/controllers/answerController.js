const Answer = require('../models/answerMode');

// Função para criar uma nova resposta
const createAnswer = async (req, res) => {
    try {
        const { feedbackId, userId, answer } = req.body;

        const newAnswer = new Answer({
            feedbackId,
            userId,
            answer
        });

        await newAnswer.save();  

        return res.status(201).json(newAnswer);  // Retorna a resposta criada com status 201
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar a resposta', error: error.message });
    }
};

// Função para buscar todas as respostas de um feedback específico
const getAnswersByFeedbackId = async (req, res) => {
    try {
        const { feedbackId } = req.params;

        const answers = await Answer.find({ feedbackId })
            .populate('feedbackId userId');  // Preenche as referências feedbackId e userId

        if (answers.length === 0) {  // Corrigido: verifica se o array de respostas está vazio
            return res.status(404).json({ message: 'Nenhuma resposta encontrada para este feedback' });
        }

        return res.status(200).json(answers);  // Retorna as respostas encontradas com status 200
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar respostas', error: error.message });
    }
};

// Função para deletar uma resposta pelo ID
const deleteAnswer = async (req, res) => {
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
const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        const updatedAnswer = await Answer.findByIdAndUpdate(id, { answer }, { new: true });  // Atualiza a resposta

        if (!updatedAnswer) {
            return res.status(404).json({ message: 'Resposta não encontrada para atualizar' });
        }

        return res.status(200).json(updatedAnswer);  // Retorna a resposta atualizada
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar a resposta', error: error.message });
    }
};
// Exportando as funções para serem usadas nas rotas
module.exports = {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswersByFeedbackId,  
};
