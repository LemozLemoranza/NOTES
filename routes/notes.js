const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { NewNote } = require('../controllers/notes');
const { validarJWT } = require('../helpers/jwt-validator');

router.get('/new-note', [
validarJWT
], NewNote)

module.exports = router