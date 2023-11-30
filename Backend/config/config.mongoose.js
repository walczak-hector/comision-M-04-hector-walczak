const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const conectarMongo = async () => {
    try {
        console.log('Conectando...');
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado')
    } catch (error) {
        console.log('Error: ', error);
    }
}

module.exports = conectarMongo;