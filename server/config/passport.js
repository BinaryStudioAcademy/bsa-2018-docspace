const userRep = require('../repositories/UserRepository')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    userRep.getById({_id: id})
      .then(user => done(null, user))
      .catch(err => done(err))
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    userRep.get({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' })
        }
        user.comparePassword(password)
          .then((isMatch) => {
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  }
  ))
}

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'dasfjasdfjasdfjwer3442rifasdfa234234sddfDDds'
},
function (jwtPayload, cb) {
  return userRep.getById({_id: jwtPayload._id})
    .then(user => {
      return cb(null, user)
    })
    .catch(err => {
      return cb(err)
    })
}
))
