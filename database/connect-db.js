const mongoose  = require("mongoose")

const dbConnection = async() => {
    try{
        mongoose.connect(process.env.MONGO_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true, 
        })
        console.log('Base de Datos lista')
    }catch(err){
        console.log(err)
        throw new Error('Error al iniciar la base de datos | Hable con el administrador')
    }
}

module.exports = {
    dbConnection
}