const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const login = (req, res, next) => {
  passport.authenticate('local', {session: false}, function (err, user, info) {
    if (err) return next(err)
    if (!user) {
      return res.json({ success: false, message: info.message })
    }
    req.logIn(user, {session: false}, loginErr => {
      if (loginErr) {
        return res.json({ success: false, message: loginErr })
      }
      const token = jwt.sign({_id: user._id}, 'dasfjasdfjasdfjwer3442rifasdfa234234sddfDDds')
      user = {
        spaces: user.spaces,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        login: user.login
      }
      // return res.json({ success: true, message: 'authentication succeeded', user: user, token: token })
      return res.json({ success: true, message: 'authentication succeeded', user, token })
    })
  })(req, res, next)
}

const loggedIn = (req, res) => {
  if (req.user) {
    let user = {
      spaces: req.user.spaces,
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      login: req.user.login
    }
    return res.json({ isLoggedIn: true, message: user })
  } else {
    return res.json({ isLoggedIn: false, message: 'No user in session' })
  }
}

router.get('/', loggedIn)
router.post('/', login)

module.exports = router
