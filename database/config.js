const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Db Conectado');
    } catch (error) {
        console.log('DB Online');
        console.log(error);
        throw new Error('Ocurrio un error carajo');
    }
}

module.exports = {
    dbConnection
}