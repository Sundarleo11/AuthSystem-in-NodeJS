const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    email: {
        type: String,
        //unique: true
        default: null

    },
    password: {
        type: String,
       // default: null
    },

    token: {
        type: String

    }


});

//module.exports.models = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema);