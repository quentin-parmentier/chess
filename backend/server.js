//Requires
const base = '/api'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()
console.log("ok")
//Options
const corsOptions = {
    origin : 'http://localhost:8080',
    optionsSuccessStatus: 200
}

//Middleware
app.use(bodyParser.json())
app.use(cors(corsOptions))

//Middleware pour jwt
var authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    //Bearer + Token
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message : "Connectez-vous"})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({message:err})
      const currentId = user.iduser
      //Pour valider l'iduser id.match(/^[0-9a-fA-F]{24}$/) car 24 caract fixé en hexa
      if(!currentId.match(/^[0-9a-fA-F]{24}$/)) return res.status(401).json({message : "Identifiant inconnu"})
      req.body = req.body.data ?? req.body
      req.body.iduser = currentId
      next()
    })
}
//app.use(authenticateToken)

//Routes
const usersRoutes = require('./routes/users.js')
app.use(`${base}/users`, usersRoutes)

const ouverturesRoutes = require('./routes/ouvertures.js')
app.use(`${base}/ouvertures`, ouverturesRoutes)

const variantesRoutes = require('./routes/variantes.js')
app.use(`${base}/variantes`, variantesRoutes)

const finalesRoutes = require('./routes/finales.js')
app.use(`${base}/finales`, finalesRoutes)

const authRoutes = require('./routes/auth.js')
app.use(`${base}/auth`, authRoutes)

app.use(express.static(__dirname + '/../dist/'))
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/../dist/index.html'))

//app.get('*', (req,res) => {
//    res.status(404).json({message:"Not found"})
//})

//Listener
const port = 3000;
app.listen(port)