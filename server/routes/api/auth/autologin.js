const router = require('express').Router()

module.exports = passport => (
  router.get('/', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, authUser, info) => {
      console.log('IN AUTOLOGIN ___________________')
      console.log('authUser')
      console.log(authUser)
      console.log('err')
      console.log(err)
      if (authUser) {
        let user = {
          spaces: authUser.spaces,
          _id: authUser._id,
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          email: authUser.email,
          login: authUser.login
        }
        return res.json({ isLoggedIn: true, message: user })
      } else {
        return res.json({ isLoggedIn: false, message: 'No user in session' })
      }
    }
    )(req, res, next)
  }
  )
)
