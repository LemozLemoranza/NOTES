const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')


const User = require("../models/User");






const Login = (req,res) => {
   
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       const valores = req.body;
       const validaciones = errors.array()
       res.render('users/login', {validaciones, valores})
    }
    else{

        res.send('ok')
    }
    
}






const Register = async(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       const valores = req.body;
       const validaciones = errors.array()
       res.render('users/register', {validaciones, valores})
    }
    
    else{

        const { name, email, password} = req.body
        const newUser = new User({name, email, password })
        
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt)
        
        await newUser.save()
        
        res.render('users/login',{name})
        
    }
   
}

module.exports = {
    Login,
    Register
}