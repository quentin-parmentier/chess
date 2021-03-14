const mongoose = require('mongoose');

const OuvertureSchema = require('./ouverture.js')
const FinaleSchema = require('./finales.js')

const UserSchema = mongoose.Schema({
  pseudo: {
    type: String, 
    required: [true,'Pseudo is required'], 
    unique: true
  },
  password: {
    type: String, 
    required: [true,'Password is required']
  },
  mail: {
    type: String, 
    required: [true,'Mail is required'], 
    unique: true
  },
  ouvertures : {
    type: OuvertureSchema, required: false
  },
  finales : {
    type: FinaleSchema, required: false
  }
});

UserSchema.post('save', function(error, doc, next){
  if(error.name === "MongoError" && error.code === 11000){
    //On a une violation d'unique
    if(error.keyValue.pseudo) return Promise.reject('Ce pseudo existe déjà')
    if(error.keyValue.mail) return Promise.reject('Cet email existe déjà')
  }else{
    next()
  }
})

module.exports = UserSchema;