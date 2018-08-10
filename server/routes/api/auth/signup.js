const router = require('express').Router()
const userService = require('../../../services/userService')

router.post('/', userService.signUp)

module.exports = router
