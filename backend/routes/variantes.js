const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const VarianteModel = require('../models/variantes.js');
const Variante = mongoose.model('Variante', VarianteModel);
const router = express.Router()
const connect = require('../globals/connection.js')

//Toutes les routes commencent par /variantes

/**
 * Ajoute une variante à une ouverture
 * @param color
 * @param idOuverture
 * @param name
 * @param commentaire
 * @param idEmbed
 * @param origine (Optionnel)
*/
router.post('/', async (req,res) => {
    connect()
    const datas = req.body;
    const myUser = await User.findOne({ _id: datas.iduser })
    
    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})
    
    //Si les données envoyées sont correctes (type : ouverture ou finale)
    if(! myUser?.ouvertures?.[datas.color]) return res.status(400).json({message : 'Type ou couleur inconnue'})
    if(!datas.name || datas.name == "") return res.status(400).json({message : 'Le nom de la variante est obligatoire'})

    //On cherche notre ouverture
    const foundO = myUser.ouvertures[datas.color].find(el => el._id == datas.idOuverture)
    if(!foundO) return res.status(400).json({message : 'Cette ouverture n\'existe pas'})

    const newVariante = new Variante({
        name:datas.name
        ,commentaire:datas.commentaire
        ,id:datas.idEmbed
        ,origine: datas.origine
    })

     //Si c'est la premiere variante, on initialise
    if(foundO.variantes === undefined){
        foundO.variantes = [newVariante]
    }else{
        foundO.variantes.push(newVariante)
    }

    await myUser.save()
    const updatedValues = await User.findOne({ _id: datas.iduser })
    return res.status(201).json({message : 'Variante créée', ouvertures: updatedValues.ouvertures})
    
})

/**
 * Modifie une variante
 * @param color
 * @param idOuverture
 * @param idVariante
 * @param name
 * @param commentaire
 * @param idEmbed
 * @param origine (Optionnel)
 */
router.put('/', async (req,res) => {
    connect()
    const datas = req.body;
    const myUser = await User.findOne({ _id: datas.iduser })

    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    //Si les données envoyées sont correctes (type : ouverture ou finale)
    if(! myUser?.ouvertures?.[datas.color]) return res.status(400).json({message : 'Type ou couleur inconnue'})
    
    //On cherche notre ouverture
    const foundO = myUser.ouvertures[datas.color].find(el => el._id == datas.idOuverture)
    if(!foundO) return res.status(400).json({message : 'Cette ouverture n\'existe pas'})
    
    //On cherche la variante à changer
    const foundV = foundO.variantes.find(el => el._id == datas.idVariante)
    if(!foundV) return res.status(400).json({message : 'Cette variante n\'existe pas'})

    //On met à jour l'objet
    foundV.name = datas.name
    foundV.commentaire = datas.commentaire
    foundV.id = datas.idEmbed
    foundV.origine = datas.origine
    await myUser.save()
    const updatedValues = await User.findOne({ _id: datas.iduser })
    return res.status(200).json({message : 'Variante modifiée',ouvertures: updatedValues.ouvertures})

})

module.exports = router;