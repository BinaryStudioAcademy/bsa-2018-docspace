const router = require('express').Router()

router.get('/', (req, res, next) => {
  if (!req.user) {
    return res.json({ isLoggedIn: false, message: 'No user in session' })
  }
  return res.json({ isLoggedIn: true, message: req.user })
}
)

module.exports = router
