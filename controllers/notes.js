const { validationResult } = require("express-validator");
const Note = require("../models/Note");

const NewNote = (req,res) => {
    res.render('notes/new-note')
}

const AddNewNote = async(req,res) => {

 

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       const valores = req.body;
       const validaciones = errors.array()
       res.render('notes/new-note', {validaciones, valores})
    }
    
    else{
        const usuario = req.usuario.id
        const { title, description } = req.body
        const newNote = new Note({title, description, user:usuario })
        await newNote.save()
        
        res.redirect('/notes/list-note')
        
    }
}

const ListNote = async(req,res)=>{
    const notes = await Note.find({user:req.usuario.id}).lean().sort({date: 'desc'});
    res.render('notes/list-note', {notes})
}

const ViewEditNote = async(req,res) => {
    const note = await Note.findById(req.params.id).lean()
    res.render('notes/edit-note', {note})
}

const EditNote = async(req,res)=>{
    const {title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    res.redirect('/notes/list-note')
}

const DeleteNote = async(req,res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes/list-note')
}







module.exports = {
    NewNote,
    AddNewNote,
    ListNote,
    ViewEditNote,
    EditNote,
    DeleteNote,
    
}