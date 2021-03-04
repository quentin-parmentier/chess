const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const OuvertureModel = require('../models/ouverture.js');
const Ouverture = mongoose.model('Ouverture', OuvertureModel);
const ColorOuvertureModel = require('../models/colorOuverture.js');
const ColorOuverture = mongoose.model('ColorOuverture', ColorOuvertureModel);

const router = express.Router()
const connect = require('../globals/connection.js');

//Toutes les routes ici commencent par /ouvertures

/**
 * Ajoute une ouverture
 * @param color
 * @param idOuverture
 * @param name
 * @param commentaire
 * @param img
 */
router.post('/', async (req, res) => {
    const datas = req.body
    connect()
    const myUser = await User.findOne({ _id: datas.iduser })
    if(myUser !== null){
        if(myUser.ouvertures === undefined){
            myUser.ouvertures = new Ouverture()
        }
        if(datas.color && (datas.color === 'white' || datas.color === 'black')){
            const colorAdd = datas.color
            const newOppening = new ColorOuverture({
                 name: datas.name
                ,commentaire: datas.commentaire
                ,img: datas.img
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

/**
 * Modifie une ouverture
 * @param color
 * @param idOuverture
 * @param name
 * @param commentaire
 * @param img
*/
router.put('/', async (req,res) => {
    const datas = req.body
    connect()
    //await User.updateOne(
    //{ 
    //    "_id": datas.iduser,
    //    "ouvertures.black._id": datas.idOuverture
    //},
    //{
    //    "ouvertures.black.$.name" : datas.name,
    //    "ouvertures.black.$.commentaire" : datas.commentaire,
    //    "ouvertures.black.$.img" : datas.img
    //},
    //{new: true},(err) => {
    //    if(err){
    //        res.status(400).json({message : "Mise à jour impossible"})
    //    }
    //    res.status(201).json({message : "Ouverture modifiée"})
    //})
    
    const myUser = await User.findOne({ _id: datas.iduser })
    if(myUser !== null){
        if(datas.color && (datas.color === 'white' || datas.color === 'black')){
            const foundO = myUser.ouvertures[datas.color].find(el => el._id == datas.idOuverture)

            if(foundO){
                foundO.name = datas.name
                foundO.commentaire = datas.commentaire
                foundO.img = datas.img
                myUser.save()
            }else{
                res.status(400).json({message : 'Cette ouverture n\'existe pas'})
            }

            res.status(201).json({message : 'Ouverture modifiée'})
        }else{
            res.status(400).json({message : 'Couleur non valide'})
        }
    }else{
        res.status(400).json({message : 'Utilisateur non trouvé'})
    }   
})

module.exports = router;