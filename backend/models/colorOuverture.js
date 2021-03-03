const mongoose = require('mongoose');

const VarianteSchema = require('./variantes.js')

const ColorOuvertureSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    commentaire: {
        type: String, required: false
    },
    img: {
        type: String, required: false
    },
    variantes :{
        type: [VarianteSchema], required: false
    }
})

module.exports = ColorOuvertureSchema;