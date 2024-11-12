const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/config')

//Gerar o token JWT

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let userData = null;
        User.findOne({email: email}).then(user => userData = user)

        if(userData) return res.status(409).json('Esse email já está sendo usado!')

        const user = new User({ username: username, password: password, email: email });

        await user.save();

        res.status(201).json({ message: "Usuário criado com sucesso: " + user });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário: " + error })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user || !await user.comparePassword(password)) {
            res.status(401).json({ error: "Usuário ou senha inválida!" });
        }

        const token = generateToken(user._id);
        res.json({ token, message: "Login efetuado com sucesso!" })
    } catch (error) {
        res.status(500).json({error: "Erro ao logar"+error})
    }

}

