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

const loggedIn = (req, res) => {
  if (req.user) {
    return res.json({ success: true, message: req.user })
  } else {
    return res.json({ success: false, message: 'No user in session' })
  }
}

router.get('/', loggedIn)
router.post('/', login)

module.exports = router
