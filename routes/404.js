const { Router } = require("express");
const { NotFound } = require("../controllers/404");
const { ListNote } = require("../controllers/notes");
const { validarJWT } = require("../helpers/jwt-validator");
const router = Router();



router.get('*', [
    validarJWT
], NotFound)


module.exports = router