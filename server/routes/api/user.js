const router = require('express').Router()
const userService = require('../../services/userService')
const notificationService = require('../../services/notificationService')

router.get('/', userService.findAll)

router.get('/name/:name', userService.getByName)

router.get('/:id', userService.findOne)

router.post('/', userService.add)

router.put('/:id', userService.findOneAndUpdate)

router.put('/:id/setting', userService.updateSettingData)

router.post('/changePassword', userService.changePassword)

router.post('/compareUsers', userService.compareUsers)

router.delete('/:id', userService.findOneAndDelete)

router.delete('/:id/notifications', notificationService.deleteForUser)

module.exports = router
