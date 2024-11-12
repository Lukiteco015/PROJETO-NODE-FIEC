const express = require('express');
const app = express();
const port = 3000;
const authRouters = require('./routes/authRouters');
const answerRoutes = require('./routes/answerRoutes');
const conexaoDB = require('./database');

conexaoDB();

app.use(express.json());
app.use('/auth', authRouters);
app.use('/answers', answerRoutes);

app.listen(port, () => {
    console.log("Servidor iniciado na url: http://localhost:3000/");
});


module.exports = app;