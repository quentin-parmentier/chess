const mongoose = require('mongoose');

const connect = async function (res){
    await mongoose.connect("mongodb+srv://user_rw:GAr3SBjxAK6QfelD@chesstraining.d96wx.mongodb.net/chessTraining?retryWrites=true&w=majority"
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion réussie"))
    .catch((error) => res.status(500).json({error}))
}

module.exports = connect;