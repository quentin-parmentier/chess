const mongoose = require('mongoose');
const RefreshSchema = mongoose.Schema({
    token: {
        type: String, required: true
    },
    iduser: {
        type: String, required: true
    }
})

module.exports = RefreshSchema;