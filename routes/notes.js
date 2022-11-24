const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { NewNote, AddNewNote, ListNote, ViewEditNote, EditNote, DeleteNote } = require('../controllers/notes');
const { validarJWT } = require('../helpers/jwt-validator');

router.get('/new-note', [
    validarJWT,
], NewNote)


router.post('/new-note', [
    validarJWT,
    check('title', 'El titulo es obligatorio').trim().not().isEmpty(),
    check('description', 'La descripcion es obligatoria').trim().not().isEmpty(),


], AddNewNote)


router.get('/list-note', [
    validarJWT
], ListNote)


router.get('/edit-note/:id', [] , ViewEditNote)

router.put('/edit-note/:id', [], EditNote)

router.delete('/delete/:id', [], DeleteNote)


    
module.exports = router