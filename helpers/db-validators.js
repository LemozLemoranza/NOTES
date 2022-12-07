const User = require("../models/User");
const bcrypt = require('bcryptjs');


const NameNotExist = async(nameL='') => {
    const name = nameL.toUpperCase()
    const nameExist = await User.findOne({name});
    if( nameExist ){
        throw new Error (`El nombre ${name} ya se encuentra registrado`)
    }
}

const EmailNotExist = async(emailL='') => {
    const email = emailL.toUpperCase()
    const emailExist = await User.findOne({email});
    if( emailExist ){
        throw new Error (`El email ${email} ya se encuentra registrado`)
    }
}

const UserExist = async(value, {req}) => {
    
    const emailL = req.body.email
    const email = emailL.toUpperCase()
    const user = await User.findOne({ email });

    if(!user){
        throw new Error ('Correo o contraseña incorrectos')
    }
    
    const passwordExiste = bcrypt.compareSync( value, user.password)
    if( !passwordExiste ){
    throw new Error (`Correo o contraseña incorrectos`)
    }
}

module.exports = {
    NameNotExist,
    EmailNotExist,
    UserExist
    
}
