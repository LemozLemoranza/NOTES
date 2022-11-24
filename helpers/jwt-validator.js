const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.cookies.loginTK ;
    
    if ( !token ) {
        return res.status(401).redirect('/user/login');
    }

    try {
        
        jwt.verify( token, process.env.SECRET_KEY )
        

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

    next()
}


const validarJWT2 = async( req = request, res = response, next ) => {

    const token = req.cookies.loginTK ;
    
    if ( token ) {
        return res.redirect('/notes/list-note');
    }

    

    next()
}



module.exports = {
    validarJWT,
    validarJWT2
}