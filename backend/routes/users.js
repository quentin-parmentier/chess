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
    const myUser = await User.findOne({ _id: req.body.iduser })
    
    //Est-ce que notre utilisateur existe ?
    if(myUser == null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    return res.status(200).json({ouvertures : myUser.ouvertures, finales : myUser.finales})
})

module.exports = router;