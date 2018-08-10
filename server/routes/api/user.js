const router = require('express').Router()
const userService = require('../../services/user')

router.get('/', userService.findAll)

router.get('/:id', userService.findOne)

router.post('/', userService.add)

router.put('/:id', userService.findOneAndUpdate)

router.post('/changePassword', userService.changePassword)

router.delete('/:id', userService.findOneAndDelete)

module.exports = router
