const jwbtoken = require('jsonwebtoken');


const generarJWT = ( uid='' ) => {
    
    return new Promise((resolve, reject) => {
        
        const payload = {uid};
        jwbtoken.sign(payload, process.env.SECRET_KEY, {
            // expiresIn: '4h'
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