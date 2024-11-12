const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/config');

const authMiddlewareAdmin = (req, res, next) => {
    const token = req.header['Authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({erro: "Acesso negado, token ausente!"})
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        const user = null;
        User.findOne({email: req.user.email}).then(userData => user = userData)
        if(user.role == 'ADMIN') next();
        else res.status(403).json({erro: "Acesso não autorizado!"})
    }
    catch(erro){
        res.status(500).json({erro: "Erro inesperado no servidor: "+erro})
    }
} 

module.exports = authMiddlewareAdmin;