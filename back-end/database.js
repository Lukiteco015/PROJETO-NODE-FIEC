const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/projeto_node")
        console.log("MongoDB conectado com Sucesso!")
    } catch (error){
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1);
    }
};


module.exports = connectDB;