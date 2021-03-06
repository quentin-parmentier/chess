//Requires
const app = require('express')()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

//Options
const corsOptions = {
    origin : 'http://localhost:8080',
    optionsSuccessStatus: 200
}

//Middleware
app.use(bodyParser.json())
app.use(cors(corsOptions))
// @ TODO
//Middleware pour jwt
var authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message : "Connectez-vous"})
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({message:err})
      const currentId = user.iduser
      if(!currentId.match(/^[0-9a-fA-F]{24}$/)) return res.status(401).json({message : "Identifiant inconnu"})
      req.body = req.body.data ?? {}
      req.body.iduser = currentId
      next()
    })
}
app.use(authenticateToken)
//Middleware pour valider l'iduser id.match(/^[0-9a-fA-F]{24}$/)

//Routes
const usersRoutes = require('./routes/users.js')
app.use('/users', usersRoutes)

const ouverturesRoutes = require('./routes/ouvertures.js')
app.use('/ouvertures', ouverturesRoutes)

const variantesRoutes = require('./routes/variantes.js')
app.use('/variantes', variantesRoutes)

const finalesRoutes = require('./routes/finales.js')
app.use('/finales', finalesRoutes)

app.get('*', (req,res) => {
    res.status(404).json({message:"Not found"})
})


//Listener
app.listen(3000)