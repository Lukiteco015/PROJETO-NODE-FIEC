const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config')

exports.get_users = async (req, res) => {
    const users = userService.get_users();

    res.json({users: users});
};

exports.get_user = async (req, res) => {
    const {id} = req.params
    const user = await userService.get_user(id);

    res.json({user: user});
}

exports.get_user_principal = async (req, res) => {
    const id = req.userId;

    const user = await userService.get_user(id);

    res.json({user: user})
}

exports.update_user = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try{
        const userUpdate = await userService.update_user(userId, username, email, password);
        res.json({user: userUpdate});
    } catch(erro){
        res.status(500).json({erro: erro});
    }

}