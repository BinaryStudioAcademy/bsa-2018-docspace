const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
const mongooseConnection = require('./db/dbConnect').connection
const apiRoutes = require('./routes/api/routes')
const sessionSecret = require('./config/session').secret
const path = require('path')
const passport = require('passport')
var flash = require('express-flash')
const app = express()
const port = process.env.PORT || 3001
require('./config/passport')()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))

app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongooseConnection
    })
  })
)
app.use(flash())

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

app.listen(port, () => console.log(`Listening on port ${port}`))
