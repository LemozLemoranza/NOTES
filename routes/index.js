const {Router} = require('express');
const { validarJWT2 } = require('../helpers/jwt-validator');
const router = Router();


router.get('/', validarJWT2 ,(req, res)=>{
    res.render('index')
})





module.exports = router