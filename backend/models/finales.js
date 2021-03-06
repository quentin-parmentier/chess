const mongoose = require('mongoose');

const VarianteSchema = require('./variantes.js')

const FinaleSchema = mongoose.Schema({
    pion : {
        type: [VarianteSchema], required: false
    },
    tour : {
        type: [VarianteSchema], required: false
    }
})

module.exports = FinaleSchema