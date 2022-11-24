const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.cookies.loginTK ;
    
    if ( !token ) {
        return res.status(401).redirect('/users/login');
    }

    try {
        
        const {uid} = jwt.verify( token, process.env.SECRET_KEY )

        const usuario = await User.findById(uid)
        
        req.usuario = usuario 

        next()
        

    } catch (error) {

        return res.status(401).redirect('/users/login');

    }

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