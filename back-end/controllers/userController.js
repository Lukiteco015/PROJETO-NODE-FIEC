const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config')

exports.get_users = async (req, res) => {
    const users = userService.get_users();

    res.json({users: users});
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

exports.get_user_principal = async (req, res) => {
    const id = req.userId.id;

    const user = await userService.get_user(id);

    res.json({user: user})
}

exports.update_user = async (req, res, next) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try{
        const userUpdate = await userService.update_user(userId, username, email, password);
        res.json({user: userUpdate});
    } catch(erro){
        res.status(404).json({erro: erro});
    }

}

exports.update_role = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try{
        const userUpdate = await userService.update_role(userId, role);
        res.json({user: userUpdate});
    } catch(erro){
        res.status(404).json({erro: erro});
    }

}

exports.delete_user = async (req, res) => {
    const { userId } = req.params;

    try{
        const userDelete = await userService.delete_user(userId);
        if(userDelete) res.status(200);
    } catch(erro){
        res.status(404).json({erro: erro});
    }

}