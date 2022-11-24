const {Schema, model} = require("mongoose");

const UserSchema = Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.methods.toJSON = function(){
    const {_id,...user} = this.toObject();
    user.uid = _id
    return user
}


module.exports = model('User', UserSchema)

