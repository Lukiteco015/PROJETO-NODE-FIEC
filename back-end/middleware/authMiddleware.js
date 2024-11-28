const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config')

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({erro: "Acesso negado, token ausente!"})
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded;
        next();
    }
    catch(erro){
        res.status(403).json({erro: "Acesso não autorizado!"})
    }
} 

module.exports = authMiddleware;