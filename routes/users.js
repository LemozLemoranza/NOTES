const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const { Login, Register } = require('../controllers/users');
const { NameNotExist, EmailNotExist, UserExist } = require('../helpers/db-validators');
const User = require('../models/User');



router.get('/login', (req,res) => {
    res.render('users/login')
} )

router.post('/login', [

    check('email', 'El correo es invalido').isEmail(),

    check('password','La contraseña es obligatoria').not().isEmpty(),

    check('password').custom(UserExist),
    
    
], Login )


router.get('/register', (req,res) => {
    res.render('users/register')
})

router.post('/register', [
    check('name', 'El nombre es obligatorio').trim().not().isEmpty(),
    check('name').custom(NameNotExist),
    check('email', 'El correo es invalido').isEmail(),
    check('email').custom(EmailNotExist),
    check('password','La contraseña debe contener mas de 5 carácteres').isLength(6)
    ,
    check('password', 'La contraseña es obligatoria')
        .not().isEmpty()
        .custom((value, {req}) => {
            if(value !== req.body.confirm_password){
                throw new Error('Las contraseñas no coinciden')
            }else{
                return value
            }
        }
    ),   
], Register )






module.exports = router