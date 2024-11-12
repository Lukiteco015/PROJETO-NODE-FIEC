const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.header['Authorization']?.split(' ')[1];

    if(!token){
        res.status(401).json({erro: "Acesso não autorizado!"})
    }

    try{
        const decoded = jwt.verify(token);
        req.user = decoded;
        next();
    }
    catch(erro){
        res.status(500).json({erro: "Erro inesperado no servidor: "+erro})
    }
} 

module.exports = authMiddleware;