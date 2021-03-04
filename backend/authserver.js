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
const authRoutes = require('./routes/auth.js')
app.use('/', authRoutes)

//Listener
app.listen(4000)