const mongoose = require('mongoose');

const OuvertureSchema = require('./ouverture.js')

const UserSchema = mongoose.Schema({
  pseudo: {
    type: String, required: [true,'Pseudo is required'], unique: true
  },
  password: {
    type: String, required: [true,'Password is required']
  },
  ouvertures : {
    type: OuvertureSchema, required: false
  }
});

module.exports = UserSchema;