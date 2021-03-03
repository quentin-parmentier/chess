const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/users.js');
const User = mongoose.model('User', UserModel);
const VarianteModel = require('../models/variantes.js');
const Variante = mongoose.model('Variante', VarianteModel);
const router = express.Router()
const connect = require('../globals/connection.js')

//Toutes les routes commencent par /variantes

//Ajoute une variante à une ouverture
router.post('/', async (req,res) => {
    connect()
    const datas = req.body;
    const myUser = await User.findOne({ _id: datas.iduser })

    if(myUser !== null){
        //type = ouverture ou finale
        if(!myUser[datas.type] || !myUser[datas.type][datas.color]){
            res.status(400).json({message : 'Type ou couleur inconnue'})
        }else{
            
            const foundO = myUser[datas.type][datas.color].find(el => el._id == datas.idOuverture)
            if(foundO !== undefined){

                const newVariante = new Variante({
                    name:datas.name
                    ,commentaire:datas.commentaire
                    ,id:datas.idVariante
                    ,origine: datas.origine
                })

                 //Si c'est la premiere variante, on initialise
                if(foundO.variantes === undefined){
                    foundO.variantes = [newVariante]
                }else{
                    foundO.variantes.push(newVariante)
                }

                myUser.save()
                res.status(200).json({message : 'Variante créée'})
            }else{
                res.status(400).json({message : 'Cette ouverture n\'existe pas'})
            }
        }
        
    }else{
        res.status(400).json({message : 'Utilisateur non trouvé'})
    }
})

module.exports = router;