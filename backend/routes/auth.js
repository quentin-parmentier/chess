require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const RefreshModel = require('../models/refresh.js');
const Refresh = mongoose.model('Refresh', RefreshModel);
const router = express.Router()
const connect = require('../globals/connection.js');
const expiresIn = 60*15;
//Toutes les routes ici commencent par /auth

/**
 * Create a user
 * @param pseudo
 * @param mail
 * @param password
 */
router.post('/signup', async (req, res) => {

    const password = req.body.password
    const mail = req.body.mail
    const pseudo = req.body.pseudo

    //Vérifications
    if(!password || password.length < 6 || password.length > 20) return res.status(401).json({message:"Votre mot de passe doit faire entre 6 et 20 caractères"})
    const regexEmail = /^\S+@\S+\.\S+$/
    if(!mail || mail.length > 50 || !regexEmail.test(mail)) return res.status(401).json({message:"Format e-mail incorrect"})
    if(!pseudo || pseudo.length < 4 || pseudo.length > 20) return res.status(401).json({message:"Votre pseudo doit faire entre 4 et 20 caractères"})
    const hash = await bcrypt.hash(password, 10)
    
    //On crypte le password
    const addedUser = new User({
        pseudo:pseudo,
        mail:mail,
        password:hash
    })

    connect(res)
    console.log("apres la co")
    addedUser.save()
    .then(() => res.status(201).json({message : 'Utilisateur créé'}))
    .catch((error) => res.status(401).json({message : error}))
    
});

/**
 * Se connecte
 * @param pseudo
 * @param password
 * @return AuthToken, RefreshToken
 */
router.post('/login', async (req,res) => {
    connect(res)
    const username = req.body.pseudo
    const password = req.body.password

    //On cherche dans la bdd
    const user = await User.findOne({
        pseudo: username
    },"_id pseudo password")
    //On trouve pas --> error
    if(!user) return res.status(401).json({message : "Utilisateur inconnu"})


    //On vérifie les mdp
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) return res.status(401).json({message : "Mot de passe invalide"})

    //On trouve on créer un access token + un refresh token
    const accessToken = createToken({iduser : user._id})
    const refreshToken = jwt.sign({iduser : user._id}, process.env.REFRESH_TOKEN_SECRET)

    //On enregistre le token de refresh
    const newRefresh = new Refresh({
        token: refreshToken,
        iduser : user._id
    })
    newRefresh.save()

    //On les retourne les deux
    res.status(200).json({accessToken, refreshToken, expiresIn})
})

/**
 * Refresh notre AuthToken
 * @param Refreshtoken
 */
router.post('/refresh', async (req,res) => {
    connect(res)
    //On regarde si le token de refresh exist
    const refreshToken = await Refresh.findOne({
        token : req.body.token 
    })
    
    //Est-ce que le token existe ?
    if(!refreshToken) return res.status(403).json({message : "Impossible de vous identifier"})

    //S'il existe faut voir s'il est valide
    jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message : "Le jeton est corrompu"})
        //S'il est valide on en recréer un et on le réenvoi
        const accessToken = createToken({ iduser: user.iduser })
        res.status(200).json({ accessToken, expiresIn })
    })
})

/**
 * Nous déconnecte de tous les devices en supprimant TOUS les Refreshtoken de la base pour un id donné
 * @param Refreshtoken
 * @param iduser
 */
router.delete('/totallogout', async (req, res) => {
    connect(res)
    const refreshToken = await Refresh.findOne({
        token : req.body.token 
    })
    
    if(!refreshToken) return res.status(403).json({message : "Impossible de vous identifier"})

    //S'il existe faut voir s'il est valide
    jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({message : "Le jeton est corrompu"})
        //S'il est valide on en recréer un et on le réenvoi
        await Refresh.deleteMany({
            iduser : user.iduser
        })
        return res.status(200).json({ message : "Vous avez bien été déconnecté de tous les appareils" })
    })
})

//Fonction permettant de créer un jwt
function createToken(obj){
    return jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}


module.exports = router