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
    connect(res)
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
    
    return res.status(201).json({message : 'Ouverture créée', ouvertures: myUser.ouvertures})
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
    connect(res)
    
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
    await myUser.save()
    setTimeout(function(){
    return res.status(200).json({message : 'Ouverture modifiée', ouvertures: myUser.ouvertures})
    },2000)
})

/**
 * Modifie une ouverture
 * @param color
 * @param idOuverture
*/
router.delete('/', async (req,res) => {
    const datas = req.body
    connect(res)

    const myUser = await User.findOne({ _id: datas.iduser })

    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    //Est-ce qu'on a choisi une bonne couleur ?
    if(!datas.color || (datas.color !== 'white' && datas.color !== 'black')) return res.status(400).json({message : 'Couleur non valide'})

    //On cherche notre ouverture
    myUser.ouvertures[datas.color] = myUser.ouvertures[datas.color].filter(el => el._id != datas.idOuverture)
    await myUser.save()

    return res.status(200).json({message : 'Ouverture supprimée', ouvertures: myUser.ouvertures})

})

module.exports = router;