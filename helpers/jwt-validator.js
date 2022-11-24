const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.cookies.loginTK ;
    //TODO me quede aquí FALTA CERRAR SESSION Y REDIRIGIR Y TODO LAS NOTAS 
    if ( !token ) {
        return res.status(401).redirect('/users/login');
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




module.exports = {
    validarJWT
}