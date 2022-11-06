const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    Firstrname: {
        type: String,
        default: null
    },
    Lastname: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },

    token: {
        type: String

    }


});

module.exports = mongoose.model('user', userSchema);