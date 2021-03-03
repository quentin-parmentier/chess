const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const router = express.Router()
const connect = require('../globals/connection.js')
//Toutes les routes ici commencent par /users

//Create a user
router.post('/', async (req, res) => {
    
    const addedUser = new User({
        pseudo:req.body.pseudo,
        password:req.body.password
    })
   
    await connect()
    addedUser.save()
    .then(() => res.status(201).json({message : 'Utilisateur créé'}))
    .catch((error) => res.status(400).json({error}))
    
});

//Get a user and his oppenings
router.get('/', async (req, res) => {
    await connect()
    const myUser = await User.findOne({ _id: req.body.iduser }, 'ouvertures')

    if(myUser == null){
        res.status(400).json({message : 'Utilisateur non trouvé'})
    }else{
        res.status(201).json({datas : myUser.ouvertures})
    }
})

module.exports = router;