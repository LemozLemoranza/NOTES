const User = require("../models/User");
const bcrypt = require('bcryptjs');


const NameNotExist = async(name='') => {
    const nameExist = await User.findOne({name});
    if( nameExist ){
        throw new Error (`El nombre ${name} ya se encuentra registrado`)
    }
}

const EmailNotExist = async(email='') => {
    const emailExist = await User.findOne({email});
    if( emailExist ){
        throw new Error (`El email ${email} ya se encuentra registrado`)
    }
}

const UserExist = async(value, {req}) => {
    const email = req.body.email
    const user = await User.findOne({ email });

    if(!user){
        throw new Error ('Correo o contraseña incorrectos-correo')
    }
    
    const passwordExiste = bcrypt.compareSync( value, user.password)
    if( !passwordExiste ){
    throw new Error (`Correo o contraseña incorrectos-pass`)
    }
}

module.exports = {
    NameNotExist,
    EmailNotExist,
    UserExist
    
}