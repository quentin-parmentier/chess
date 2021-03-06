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
 * @param name
 * @param commentaire
 * @param img
 */
router.post('/', async (req, res) => {
    const datas = req.body
    connect()
    const myUser = await User.findOne({ _id: datas.iduser })

    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    //Est-ce qu'on a choisi une bonne couleur ?
    if(!datas.color || (datas.color !== 'white' && datas.color !== 'black')) return res.status(400).json({message : 'Couleur non valide'})
    if(!datas.name || datas.name == "") return res.status(400).json({message : 'Le nom de l\'ouverture est obligatoire'})
    const colorAdd = datas.color
    const newOppening = new ColorOuverture({
         name: datas.name
        ,commentaire: datas.commentaire
        ,img: datas.img
    })
    if(! myUser.ouvertures) myUser.ouvertures = new Ouverture({})
    myUser.ouvertures[colorAdd].push(newOppening)
    await myUser.save()
    const updatedValues = await User.findOne({ _id: datas.iduser })
    return res.status(201).json({message : 'Ouverture créée', ouvertures: updatedValues.ouvertures})
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

    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    //Est-ce qu'on a choisi une bonne couleur ?
    if(!datas.color || (datas.color !== 'white' && datas.color !== 'black')) return res.status(400).json({message : 'Couleur non valide'})

    //On cherche notre ouverture
    const foundO = myUser.ouvertures[datas.color].find(el => el._id == datas.idOuverture)
    if(!foundO) return res.status(400).json({message : 'Cette ouverture n\'existe pas'})

    //On update notre objet
    foundO.name = datas.name
    foundO.commentaire = datas.commentaire
    foundO.img = datas.img
    myUser.save()

    return res.status(200).json({message : 'Ouverture modifiée'})
     
})

module.exports = router;