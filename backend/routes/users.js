const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const RefreshModel = require('../models/refresh.js');
const Refresh = mongoose.model('Refresh', RefreshModel);
const router = express.Router()
const connect = require('../globals/connection.js')
//Toutes les routes ici commencent par /users

/**
 * Get a user and his oppenings
 * @param iduser
 */
router.get('/', async (req, res) => {
    connect(res)
    const myUser = await User.findOne({ _id: req.body.iduser })
    
    //Est-ce que notre utilisateur existe ?
    if(myUser == null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    return res.status(200).json({ouvertures : myUser.ouvertures, finales : myUser.finales})
})

router.get('/profil', async (req,res) => {
    connect(res)
    const myUser = await User.findOne({_id : req.body.iduser}, ['pseudo','mail'])
    if(myUser == null) return res.status(401).json({message : 'Utilisateur non trouvé'})

    return res.status(200).json(myUser)
})

/**
 * Nous déconnecte en supprimant notre Refreshtoken de la base
 * @param Refreshtoken
 */
 router.delete('/logout', async (req,res) => {
    connect(res)
    await Refresh.deleteOne({token: req.body.token})
    res.status(202).json({message : "Vous êtes bien déconnecté"})
})

/**
 * Fonction pour changer de psw
 * @param pswActu
 * @param pswNew
 * @param pswConfirm
 */
router.put('/password', async(req, res) => {

    const password = req.body.pswActu
    const newPassword = req.body.pswNew
    const confirmPassword = req.body.pswConfirm

    if(newPassword != confirmPassword) return res.status(401).json({message : "Les mots de passe sont différents"})
    
    connect(res)
    const user = await User.findOne({_id : req.body.iduser},'password')
    if(!user) return res.status(401).json({message : "Utilisateur inconnu"})

    //On vérifie le mdp
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) return res.status(401).json({message : "Mot de passe invalide"})

    //Est-ce que le nouveau mot de passe respecte les règles ?
    if(!newPassword || newPassword.length < 6 || newPassword.length > 20) return res.status(401).json({message:"Votre mot de passe doit faire entre 6 et 20 caractères"})
    
    user.password = await bcrypt.hash(newPassword, 10)

    user.save()
    .then(() => res.status(201).json({message : 'Mot de passe modifié'}))
    .catch((error) => res.status(401).json({message : error}))

})

module.exports = router;