const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
const mongooseConnection = require('./db/dbConnect').connection
const apiRoutes = require('./routes/api/routes')
const sessionSecret = require('./config/session').secret
const passport = require('passport')

require('./config/passport')()

const app = express()
const port = process.env.PORT || 3001

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.use(passport.initialize())
app.use(passport.session())

apiRoutes(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
