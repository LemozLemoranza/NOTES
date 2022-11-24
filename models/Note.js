const {Schema, model} = require("mongoose");

const NoteSchema = Schema({
    title: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

module.exports = model('Note', NoteSchema)