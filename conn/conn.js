const mongoose = require('mongoose');

const conn = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true
    }).then(() => {
        console.log('MongoDB conectado!!!');
    }).catch((err) => {
        return console.log(`Erro ao conectar com o banco!!!: ${err}`);
    })

}

module.exports = conn;

