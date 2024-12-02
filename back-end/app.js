const cors = require('cors')
const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const authRouters = require('./routes/authRouters');
const answerRouters = require('./routes/answerRouters');
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRouters = require('./routes/userRouters');
const conexaoDB = require('./database');
const User = require('./models/userModel');
const { username_adm, email_adm, password_adm, profile_adm } = require('./config/config.js');

const corsOptions = {
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200,
}

async function criarAdm(){
    const userEmail = await User.findOne({email: 'adm.sac@gmail.com'});
    if(userEmail) {
        console.log("Administrador já criado.");
        return
    }
    const user = new User({username: username_adm, email: email_adm, password: password_adm, role: 'ADMIN'});
    await user.save();
    console.log("Adiminstrador criado com sucesso!");
}

// Servindo a pasta de uploads como pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions));
app.use(express.json());

// Endpoint para retornar o administrador
app.get('/admin', async (req, res) => {
    const userEmail = await User.findOne({email: 'adm.sac@gmail.com'});
    res.status(200).json({user: userEmail, imgUrl: profile_adm});
});
app.use('/auth', authRouters);
app.use('/users', userRouters);
app.use('/answers', answerRouters);
app.use('/feedbacks', feedbackRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro para diagnóstico
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
});

app.listen(port, () => {
    console.log("Servidor iniciado na url: http://localhost:3000/");
    conexaoDB();
    criarAdm();
});


module.exports = app;