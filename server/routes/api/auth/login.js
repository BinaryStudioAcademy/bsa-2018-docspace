const router = require('express').Router()
const passport = require('passport')

const login = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err)
    if (!user) {
      return res.json({ success: false, message: info.message })
    }
    req.logIn(user, loginErr => {
      if (loginErr) {
        return res.json({ success: false, message: loginErr })
      }
      return res.json({ success: true, message: 'authentication succeeded', user: user })
    })
  })(req, res, next)
}

router.post('/', login)

module.exports = router