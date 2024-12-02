const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config')

exports.get_users = async (req, res, next) => {
    try{
        const users = await userService.get_users();

        res.json({users: users});
    } catch(erro){
        next(erro);
    }
};

exports.get_user = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await userService.get_user(id);

        res.json({user: user});
    } catch (erro){
        next(erro);
    }
}

exports.get_user_principal = async (req, res, next) => {
    try{
        const id = req.userId.id;

        const user = await userService.get_user(id);

        res.json({user: user})
    } catch (erro){
        res.json({error: erro})
        next(erro);
    }
    
}

exports.update_user = async (req, res, next) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    try{
        const userUpdate = await userService.update_user(userId, username, email, password);
        res.json({user: userUpdate});
    } catch(error){
        next(error);
        res.status(404).json({erro: error.message});
    }

}

exports.update_role = async (req, res, next) => {
    const userId = req.params.id;
    const { role } = req.body;

    try{
        const userUpdate = await userService.update_role(userId, role);
        res.json({user: userUpdate});
    } catch(erro){
        next(erro);
        res.status(404).json({erro: erro.message});
    }

}

exports.delete_user = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const deletedUser = await userService.delete_user(userId);
        res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
    } catch (error) {
        res.status(404).json({ error: error.message }); // Retorna o erro com status apropriado
    }
};
