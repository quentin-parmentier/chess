//Requires
const app = require('express')()
const bodyParser = require('body-parser')
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
//Middleware pour jwt
//Middleware pour valider l'iduser id.match(/^[0-9a-fA-F]{24}$/)
//Routes
const usersRoutes = require('./routes/users.js')
app.use('/users', usersRoutes)

const ouverturesRoutes = require('./routes/ouvertures.js')
app.use('/ouvertures', ouverturesRoutes)

const variantesRoutes = require('./routes/variantes.js')
app.use('/variantes', variantesRoutes)

app.get('*', (req,res) => {
    res.status(404).json({message:"Not found"})
})


//Listener
app.listen(3000)