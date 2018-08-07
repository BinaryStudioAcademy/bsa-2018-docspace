const router = require('express').Router()
const userService = require('../../../services/user')

router.post('/', userService.signUp)

module.exports = router
