const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const FinaleModel = require('../models/finales.js');
const Finale = mongoose.model('Finale', FinaleModel);
const VarianteModel = require('../models/variantes.js');
const Variante = mongoose.model('Variante', VarianteModel);
const router = express.Router()
const connect = require('../globals/connection.js')

//Toutes les routes commencent par /finales

/**
 * Ajoute une finale à une pièce
 * @param piece
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
    
    if(!myUser.finales) myUser.finales = new Finale({})
    if(!myUser.finales[datas.piece]) return res.status(401).json({message : 'Cette pièce n\'existe pas'})
    
    //Une finale c'est ni plus ni moins qu'une variante rattachée à une pièce aulieu d'une ouverture
    const newFinale = new Variante({
        name:datas.name
        ,commentaire:datas.commentaire
        ,id:datas.idEmbed
        ,origine: datas.origine
    })

    myUser.finales[datas.piece].push(newFinale)
    await myUser.save()
    const updatedValues = await User.findOne({ _id: datas.iduser })
    return res.status(201).json({message : 'Finale créée', finales: updatedValues.finales})
    
})

/**
 * Ajoute une finale à une pièce
 * @param piece
 * @param name
 * @param commentaire
 * @param idEmbed
 * @param origine (Optionnel)
 * @param idFinale
*/
router.put('/', async (req,res) => {
    connect()
    const datas = req.body;
    const myUser = await User.findOne({ _id: datas.iduser })
    
    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})
    if(!myUser.finales[datas.piece]) return res.status(401).json({message : 'Cette pièce n\'existe pas'})
    
    const foundF = myUser.finales[datas.piece].find(el => el._id == datas.idFinale)
    if(!foundF) return res.status(400).json({message : 'Cette finale n\'existe pas'})

    foundF.name = datas.name
    foundF.commentaire = datas.commentaire
    foundF.id = datas.idEmbed
    foundF.origine = datas.origine

    await myUser.save()
    const updatedValues = await User.findOne({ _id: datas.iduser })

    return res.status(201).json({message : 'Finale modifiée', finales: updatedValues.finales})
    
})

/**
 * Ajoute une finale à une pièce
 * @param piece
 * @param idFinale
*/
router.delete('/', async (req,res) => {
    connect()
    const datas = req.body;
    const myUser = await User.findOne({ _id: datas.iduser })
    
    //Est-ce que notre utilisateur existe ?
    if(myUser === null) return res.status(401).json({message : 'Utilisateur non trouvé'})
    if(!myUser.finales[datas.piece]) return res.status(401).json({message : 'Cette pièce n\'existe pas'})
    
    myUser.finales[datas.piece] = myUser.finales[datas.piece].filter((finale) => finale._id != datas.idFinale)
    await myUser.save()
    const updatedValues = await User.findOne({ _id: datas.iduser })

    return res.status(201).json({message : 'Finale supprimée', finales: updatedValues.finales})
    
})

module.exports = router;