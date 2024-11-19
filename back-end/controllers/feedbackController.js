const Feedback = require('../models/feedbackModel');  // Certifique-se de que o modelo está importado corretamente

// Função para criar um novo feedback
exports.createFeedback = async (req, res) => {
    try {
        const { title, content, status, score } = req.body;  // Não estamos mais usando 'userId'

        // Verificando se os campos obrigatórios estão presentes
        if (!title || !content) {
            return res.status(400).json({ error: "Title e content são obrigatórios!" });
        }

        // Criando um novo feedback
        const newFeedback = new Feedback({
            title,
            content,
            feedbackDateTime,
            status,
            score
        });

        // Salvando o feedback no banco de dados
        const savedFeedback = await newFeedback.save();

        // Retornando resposta com sucesso
        return res.status(200).json({
            message: "Feedback criado com sucesso!",
            feedback: savedFeedback
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro inesperado ao cadastrar o feedback. Tente novamente!" });
    }
};

// Função para listar todos os feedbacks, ordenados por score (maior para menor)
exports.getFeedbacksByScore = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .sort({ score: -1 })  // Ordenando pelo score de maior para menor
            .populate("userId", "username");

        return res.status(200).json(feedbacks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Nenhum feedback encontrado!" });
    }
};

// Função para editar um feedback específico
exports.editFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const { title, content, score, status } = req.body;

        // Atualizando o feedback com os dados fornecidos
        const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, {
            title,
            content,
            score,
            status
        }, { new: true });  // Retorna o feedback atualizado

        // Verificando se o feedback foi encontrado
        if (!updatedFeedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        return res.status(200).json({
            message: "Feedback editado com sucesso!",
            feedback: updatedFeedback
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro inesperado ao editar o feedback. Tente novamente!" });
    }
};

// Função para excluir um feedback específico
exports.deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;

        // Deletando o feedback com o ID fornecido
        const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

        // Verificando se o feedback foi encontrado e excluído
        if (!deletedFeedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        return res.status(200).json({ message: "Feedback excluído com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao excluir feedback." });
    }
};

// Função para curtir (aumentar o score) de um feedback
exports.likeFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const userId = req.body.userId; // O ID do usuário que está curtindo ou descurtindo

        // Buscando o feedback pelo ID
        const feedback = await Feedback.findById(feedbackId);

        // Verificando se o feedback existe
        if (!feedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        // Verificando se o usuário já deu like
        const userHasLiked = feedback.likedBy.includes(userId);

        if (userHasLiked) {
            // Se o usuário já deu like, vamos remover o like
            feedback.likedBy = feedback.likedBy.filter(id => id.toString() !== userId.toString());
            feedback.score -= 1;  // Diminuir o score
            return res.status(200).json({
                message: "Like removido com sucesso!",
                feedback
            });
        } else {
            // Se o usuário não deu like, vamos adicionar o like
            feedback.likedBy.push(userId);
            feedback.score += 1;  // Aumentar o score
            return res.status(200).json({
                message: "Feedback curtido com sucesso!",
                feedback
            });
        }

        // Salvando o feedback atualizado
        await feedback.save();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao curtir/descurtir feedback." });
    }
};
