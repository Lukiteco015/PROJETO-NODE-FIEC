const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/config');

const authMiddlewareAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({erro: "Acesso negado, token ausente!"})
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded;
        User.findById(req.userId.id).then(user => {
            if(user.role == 'ADMIN') next();
            else res.status(403).json({erro: "Acesso não autorizado!"})
        })
    }
    catch(erro){
        res.status(500).json({erro: "Erro inesperado no servidor: "+erro})
    }
} 

module.exports = authMiddlewareAdmin;