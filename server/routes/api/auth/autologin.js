const router = require('express').Router()
const UserRepository = require('../../../repositories/UserRepository')

router.get('/', (req, res, next) => {
  if (!req.user) {
    return res.json({ isLoggedIn: false, message: 'No user in session' })
  }

  UserRepository.getById(req.user._id)
    .populate('notifications')
    .then(user => {
      return res.json({ isLoggedIn: true, user: user })
    })
}
)

module.exports = router
