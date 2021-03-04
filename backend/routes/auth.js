require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const RefreshModel = require('../models/refresh.js');
const Refresh = mongoose.model('Refresh', RefreshModel);
const router = express.Router()
const connect = require('../globals/connection.js');

//Toutes les routes ici commencent par /auth

/**
 * Create a user
 * @param pseudo
 * @param password
 */
router.post('/signup', async (req, res) => {
    const password = req.body.password
    //On crypte le password
    const addedUser = new User({
        pseudo:req.body.pseudo,
        password:password
    })
   
    await connect()
    addedUser.save()
    .then(() => res.status(201).json({message : 'Utilisateur créé'}))
    .catch((error) => res.status(400).json({error}))
    
});

router.post('/login', async (req,res) => {
    await connect()
    const username = req.body.pseudo
    const password = req.body.password
    //On cherche dans la bdd
    const user = await User.findOne({
        pseudo: username,
        password: password
    },"_id")
    //On trouve pas --> error
    if(!user){
        return res.status(401).json({message : "Combinaison Pseudo - Mot de passe inconnue"})
    }
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
    res.status(200).json({accessToken:accessToken, refreshToken:refreshToken})
})

router.post('/refresh', async (req,res) => {
    await connect()
    //On regarde si le token de refresh exist
    const refreshToken = await Refresh.findOne({
        token : req.body.token 
    })
    
    if(!refreshToken) return res.status(403).json({message : "Impossible de vous identifier"})

    //S'il existe faut voir s'il est valide
    jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message : "Le jeton est corrompu"})
        //S'il est valide on en recréer un et on le réenvoi
        const accessToken = createToken({ name: user.iduser })
        res.status(200).json({ accessToken: accessToken })
    })
})

router.delete('/logout', async (req,res) => {
    await connect()
    await Refresh.deleteOne({token: req.body.token})
    res.status(202).json({message : "Vous êtes bien déconnecté"})
})

router.delete('/totallogout', async (req, res) => {
    await connect()
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
        res.status(200).json({ message : "Vous avez bien été déconnecté de tous les appareils" })
    })
})

function createToken(obj){
    return jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

module.exports = router