const userRep = require('../repositories/userRepository')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    userRep.getById({_id: id}, function (err, user) {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    userRep.get({ email }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' })
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  }
  ))
}
