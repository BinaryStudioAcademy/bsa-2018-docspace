const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connections = require('./db/connections')
const mongoose = connections.mongoose
// const elasticClient = connections.elasticClient
const apiRoutes = require('./routes/api/routes')
const sessionSecret = require('./config/session').secret
const path = require('path')
const passport = require('passport')
const app = express()
const port = process.env.PORT || 3001
const io = require('socket.io')
require('./config/passport')()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use('/convert', require('./routes/uploadFiles/uploadFilesRoutes'))

// const elasticHelper = require('./elasticHelper')
// elasticHelper.checkConnection(elasticClient)
// elasticHelper.createIndex(elasticClient, 'page')

app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)

app.use(passport.initialize())
app.use(passport.session())

const verifyJWTMiddleware = require('./middlewares/verifyToken')(passport)

apiRoutes(app, verifyJWTMiddleware)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

const server = app.listen(port, () => console.log(`Listening on port  ${port}`))

require('./sockets/initSocketEvents')(io(server))
