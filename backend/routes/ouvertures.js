const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const OuvertureModel = require('../models/ouverture.js');
const Ouverture = mongoose.model('Ouverture', OuvertureModel);
const ColorOuvertureModel = require('../models/colorOuverture.js');
const ColorOuverture = mongoose.model('ColorOuverture', ColorOuvertureModel);

const router = express.Router()
const connect = require('../globals/connection.js')

//Toutes les routes ici commencent par /ouvertures
router.post('/', async (req, res) => {
    connect()
    const myUser = await User.findOne({ _id: req.body.iduser })
    if(myUser !== null){
        if(myUser.ouvertures === undefined){
            myUser.ouvertures = new Ouverture()
        }
        if(!(req.body.color === null || req.body.color === undefined || (req.body.color !== 'white' && req.body.color !== 'black'))){
            const colorAdd = req.body.color
            const newOppening = new ColorOuverture({
                name: req.body.name
                ,commentaire: req.body.commentaire
                ,img: req.body.img
            })
            myUser.ouvertures[colorAdd].push(newOppening)
            myUser.save()
            res.status(201).json({message : 'Ouverture créée'})
        }else{
            res.status(400).json({message : 'Couleur non valide'})
        }
    }else{
        res.status(400).json({message : 'Utilisateur non trouvé'})
    }
})

module.exports = router;