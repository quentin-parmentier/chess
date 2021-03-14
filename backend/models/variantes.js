const mongoose = require('mongoose');

const VarianteSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    commentaire: {
        type: String, required: false
    },
    id:{
        type: String, required: true
    },
    origine:{
        type: Boolean, required: false
    }
})
module.exports = VarianteSchema;