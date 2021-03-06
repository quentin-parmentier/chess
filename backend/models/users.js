const mongoose = require('mongoose');

const OuvertureSchema = require('./ouverture.js')
const FinaleSchema = require('./finales.js')

const UserSchema = mongoose.Schema({
  pseudo: {
    type: String, required: [true,'Pseudo is required'], unique: true
  },
  password: {
    type: String, required: [true,'Password is required']
  },
  ouvertures : {
    type: OuvertureSchema, required: false
  },
  finales : {
    type: FinaleSchema, required: false
  }
});

module.exports = UserSchema;