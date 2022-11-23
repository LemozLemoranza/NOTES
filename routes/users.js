const {Router} = require('express');
const router = Router();

const { Login, Register } = require('../controllers/users');



router.get('/login', Login )

router.get('/register', Register )




module.exports = router