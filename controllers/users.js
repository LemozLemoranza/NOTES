const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')


const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt-generator");






const Login = async(req,res) => {
   
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       const valores = req.body;
       const validaciones = errors.array()
       res.render('users/login', {validaciones, valores})
    }
    else{

        const emailL = req.body.email
        const email = emailL.toUpperCase()
        const user = await User.findOne({email})
        const token = await generarJWT(user.id)
        const userTK = await user.name

        res.cookie('loginTK', token, {
            httpOnly:true
        })
        res.cookie("userTK", userTK, {
            httpOnly: true,
          });
        res.redirect('/notes/list-note')
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

        const { password } = req.body
        const emailL = req.body.email
        const nameL = req.body.name

        const email = emailL.toUpperCase();
        const name = nameL.toUpperCase();



        const newUser = new User({name, email, password })
        
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt)
        
        await newUser.save()
        
        res.render('users/register', {name})
        
    }
   
}




const Close = (req,res) => {
    res.clearCookie('loginTK','userTK').redirect('/users/login')
}

module.exports = {
    Login,
    Register,
    Close
}