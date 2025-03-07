const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/config')

//Gerar o token JWT

const generateToken = (userId, role, username, email) => {
    return jwt.sign({ id: userId,  role: role, username: username, email: email }, jwtSecret, { expiresIn: '1h', algorithm: 'HS256' });
};

exports.register = async (req, res) => {
    const { username, password, email, role="USER" } = req.body;

    try {
        User.findOne({email: email}).then(async (userData) => {
            if(userData) return res.status(409).json({error: 'Esse email já está sendo usado!'})

            const user = new User({ username: username, password: password, email: email, role: role });
            
            await user.save();
            
            res.status(201).json({ message: "Usuário criado com sucesso: " + user });        
        })
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário: " + error })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ error: "Usuário ou senha inválida!" });
        }

        const token = generateToken(user._id, user.role, user.username, user.email);
        res.json({ token, message: "Login efetuado com sucesso!" })
    } catch (error) {
        res.status(500).json({error: "Erro ao logar"+error})
    }

}

