const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const router = express.Router()
const connect = require('../globals/connection.js')
//Toutes les routes ici commencent par /users

/**
 * Get a user and his oppenings
 * @param iduser
 */
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