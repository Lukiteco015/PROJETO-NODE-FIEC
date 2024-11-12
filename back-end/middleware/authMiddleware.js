const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config')

const authMiddleware = (req, res, next) => {
    const token = req.header['Authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({erro: "Acesso negado, token ausente!"})
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch(erro){
        res.status(500).json({erro: "Erro inesperado no servidor: "+erro})
    }
} 

module.exports = authMiddleware;