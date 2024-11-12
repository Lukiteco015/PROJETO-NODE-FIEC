const express = require('express');
const app = express();
const port = 3000;
const authRouters = require('./routes/authRouters');
const answerRouters = require('./routes/answerRouters');
const feedbackRouters = require('./routes/feedbackRouters');
const conexaoDB = require('./database');

conexaoDB();

app.use(express.json());
app.use('/auth', authRouters);
app.use('/answers', answerRouters);
app.use('/feedbacks', feedbackRouters);


app.listen(port, () => {
    console.log("Servidor iniciado na url: http://localhost:3000/");
});


module.exports = app;