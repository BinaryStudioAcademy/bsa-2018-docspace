const router = require('express').Router()
const userService = require('../../services/userService')

router.get('/', userService.findAll)

router.get('/:id', userService.findOne)

router.post('/', userService.add)

router.put('/:id', userService.findOneAndUpdate)

router.put('/:id/setting', userService.updateSettingData)

router.post('/changePassword', userService.changePassword)

router.delete('/:id', userService.findOneAndDelete)

module.exports = router
