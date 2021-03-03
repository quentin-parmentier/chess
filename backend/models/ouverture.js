const mongoose = require('mongoose');

const ColorOuvertureSchema = require('./colorOuverture.js')


const OuvertureSchema = mongoose.Schema({
    white : {
        type: [ColorOuvertureSchema], required: false
    },
    black : {
        type: [ColorOuvertureSchema], required: false
    }
})
module.exports = OuvertureSchema