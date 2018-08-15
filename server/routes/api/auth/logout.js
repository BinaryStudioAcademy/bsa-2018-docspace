const router = require('express').Router()

router.get('/', (req, res) => {
  req.logout()
  res.send('user logout')
})

module.exports = router
