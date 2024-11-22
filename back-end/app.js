import cors from 'cors';
const express = require('express');
const app = express();
const port = 3000;
const authRouters = require('./routes/authRouters');
const answerRouters = require('./routes/answerRouters');
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRouters = require('./routes/userRouters');
const conexaoDB = require('./database');

const corsOptions = {
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200,
}

conexaoDB();

app.use(cors(corsOptions));
app.use(express.json());

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
});


module.exports = app;