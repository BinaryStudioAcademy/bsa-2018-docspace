const router = require('express').Router()
const resetService = require('../../services/resetService')
router.post('/', resetService.forgot)
router.post('/:token', resetService.setNewPassword)
router.get('/:token', resetService.redirectToForgotPass)
module.exports = router
