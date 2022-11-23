const jwbtoken = require('jsonwebtoken');


const generarJWT = ( id ) => {
    
    return new Promise((resolve, reject) => {
        
        const payload = {id};
        jwbtoken.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '2h'
        }, (err, token)=> {
            if( err ){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })

}

module.exports = {
    generarJWT
}