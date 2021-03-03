//Requires
const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

//Options
const corsOptions = {
    origin : 'http://localhost:8080',
    optionsSuccessStatus: 200
}

//Middleware
app.use(bodyParser.json())
app.use(cors(corsOptions))

//Routes
const ouverturesRoutes = require('./routes/ouvertures.js')
app.use('/ouvertures', ouverturesRoutes)

const usersRoutes = require('./routes/users.js')
app.use('/users', usersRoutes)

const variantesRoutes = require('./routes/variantes.js')
app.use('/variantes', variantesRoutes)

app.get('*', (req,res) => {
    res.status(404).json({message:"Not found"})
})


//Listener
app.listen(3000)