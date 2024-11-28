const Feedback = require('../models/feedbackModel');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const User = require('../models/userModel')
const mongoose = require("mongoose");

exports.createFeedback = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Pessoa não autorizada identificada!" });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.id;

        const { title, content, status = "Pendente", score = 0 } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Title e content são obrigatórios!" });
        }

        const feedbackDateTime = new Date();

        const newFeedback = new Feedback({
            title,
            content,
            feedbackDateTime,
            status,
            score,
            userId
        });

        const savedFeedback = await newFeedback.save();

        return res.status(200).json({
            message: "Feedback criado com sucesso!",
            feedback: savedFeedback
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro inesperado ao cadastrar o feedback. Tente novamente!" });
    }
};

exports.editFeedback = async (req, res) => {
    try {
        const { title, content } = req.body;
        const feedbackTitle = req.params.title;

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Pessoa não autorizada identificada!" });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.id;

        const feedback = await Feedback.findOne({ title: feedbackTitle });

        if (!feedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        if (feedback.userId.toString() !== userId) {
            return res.status(403).json({ error: "Você não tem permissão para editar este feedback!" });
        }

        feedback.title = title || feedback.title;
        feedback.content = content || feedback.content;

        const updatedFeedback = await feedback.save();

        return res.status(200).json({
            message: "Feedback editado com sucesso!",
            feedback: updatedFeedback
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro inesperado ao editar o feedback. Tente novamente!" });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;

        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Pessoa não autorizada identificada!" });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.id;

        if (feedback.userId.toString() !== userId) {
            return res.status(403).json({ error: "Você não tem permissão para excluir este feedback!" });
        }

        await feedback.remove();

        return res.status(200).json({ message: "Feedback excluído com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao excluir feedback." });
    }
};

exports.userHasLiked = async (req, res) => {

    const feedbackId = req.params.id;
    const userId = req.userId.id;

    try {
        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        // Converter userId para ObjectId
        const userIdObj = new mongoose.Types.ObjectId(userId);

        const userHasLiked = feedback.likedBy.some(id => {
            if (id != null) {
                console.log(id);
                console.log(id.equals(userIdObj));
                return id.equals(userIdObj);
            }
        }); // Verifica se o usuário já curtiu
        return res.status(200).json({verify: userHasLiked});
    } catch(erro){
        return res.status(500).json({ error: "Erro ao verificar feedback." });
    }

}

exports.likeFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const userId = req.body.userId;

        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        // Converter userId para ObjectId
        const userIdObj = new mongoose.Types.ObjectId(userId);

        console.log(userIdObj);
        const userHasLiked = feedback.likedBy.some(id => {
            if (id != null) {
                console.log(id);
                console.log(id.equals(userIdObj));
                return id.equals(userIdObj);
            }
        }); // Verifica se o usuário já curtiu


        if (userHasLiked) {
            feedback.likedBy = feedback.likedBy.filter(id => {
                if (id != null) {
                    return !id.equals(userIdObj)
                }
            }); // Remove o like
            feedback.score -= 1;
            await feedback.save();
            return res.status(200).json({
                message: "Like removido com sucesso!",
                feedback
            });
        } else {
            feedback.likedBy.push(userIdObj); // Adiciona o like
            feedback.score += 1;
            await feedback.save();
            return res.status(200).json({
                message: "Feedback curtido com sucesso!",
                feedback
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao curtir/descurtir feedback." });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ score: -1 }); 

        if (!feedbacks || feedbacks.length === 0) {
            return res.status(404).json({ error: "Nenhum feedback encontrado!" });
        }

        return res.status(200).json({
            message: "Feedbacks recuperados com sucesso!",
            feedbacks
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao recuperar feedbacks. Tente novamente!" });
    }
};

exports.getFeedbackId = async (req, res) => {
    try {
        const id = req.params.id;
        const feedback = await Feedback.findOne({_id: id}); 

        if (!feedback) {
            return res.status(404).json({ error: "Nenhum feedback encontrado!" });
        }

        return res.status(200).json({
            message: "Feedback recuperado com sucesso!",
            feedback
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao recuperar feedbacks. Tente novamente!" });
    }
};

exports.respondToFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const { response } = req.body;

        if (!response) {
            return res.status(400).json({ error: "A resposta é obrigatória!" });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Pessoa não autorizada identificada!" });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.id;

        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback não encontrado!" });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }

        if (user.role !== 'ADMIN' && feedback.userId.toString() !== userId) {
            return res.status(403).json({ error: "Você não tem permissão para responder a esse feedback!" });
        }

        feedback.responses.push({
            userId,
            response,
            date: new Date()
        });

        await feedback.save();

        return res.status(200).json({
            message: "Resposta registrada com sucesso!",
            feedback
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao registrar a resposta ao feedback." });
    }
};

